import { PlaylistItem } from 'iptv-playlist-parser';

export interface PipelineSink {
  handleItems(items: PlaylistItem[]): Promise<void>;
}
