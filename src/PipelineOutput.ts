import { PipelineSink } from './PipelineSink';
import { PlaylistItem } from 'iptv-playlist-parser';
import { PlaylistWriter } from './PlaylistWriter';

export class PipelineOutput implements PipelineSink {
  constructor(private readonly writer: PlaylistWriter) {}

  async handleItems(items: PlaylistItem[]) {
    await Promise.all(items.map(it => this.handleItem(it)));
  }

  private async handleItem(item: PlaylistItem) {
    await this.writer.writeLink(
      item.url,
      item.name,
      {
        'tvg-id': item.tvg.id,
        'tvg-country': item.tvg.country,
        'tvg-language': item.tvg.language,
        'tvg-logo': item.tvg.logo,
        'user-agent': item.http['user-agent'] || undefined,
        'group-title': item.group.title,
      },
      {
        'http-referrer': item.http.referrer || undefined,
        'http-user-agent': item.http['user-agent'] || undefined,
      },
    );
  }
}
