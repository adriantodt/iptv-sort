import { PipelineSink } from './PipelineSink';
import { PlaylistItem } from 'iptv-playlist-parser';

export class PipelineFilter implements PipelineSink {
  constructor(private readonly sink: PipelineSink) {}

  async handleItems(items: PlaylistItem[]) {
    const filtered = items.filter(value => !this.toRemove.some(fn => fn(value)));
    await this.sink.handleItems(filtered);
  }

  private readonly blacklistedGroupTitles: string[] = [
    'sports', 'religious', 'shop', 'music'
  ];

  private readonly whitelistedLanguages: string[] = [
    'portuguese'
  ];

  private readonly blacklistedNamesBasedOnCountry: Record<string, string[]> = {
    BR: ['boi', 'agro', 'terra', 'rocko'],
    UK: ['horse'],
    US: ['spain', '30a']
  }

  private readonly blacklistedNames: string[] = [
    '240p', '360p', 'offline', 'timeout', 'music', 'baby'
  ];

  private readonly toRemove: ((item: PlaylistItem) => boolean)[] = [
    item => {
      return this.blacklistedGroupTitles.includes((item?.group?.title || '').toLocaleLowerCase());
    },
    item => {
      const lowercasedName = (item?.name || '').toLocaleLowerCase();
      const blacklisted = this.blacklistedNamesBasedOnCountry[item?.tvg?.country || ''] || [];
      return [...blacklisted, ...this.blacklistedNames].some(value => lowercasedName.includes(value));
    },
    item => {
      const lowercasedLanguages = (item?.tvg?.language || 'english').toLocaleLowerCase();
      return !this.whitelistedLanguages.includes(lowercasedLanguages);
    },
  ];
}
