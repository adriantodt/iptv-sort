import * as fs from 'fs-extra';
import path from 'path';
import { parse } from 'iptv-playlist-parser';
import { PipelineSink } from './PipelineSink';
import { promisify } from 'util';
import { glob } from 'glob';

/**
 * Class mostly responsible with reading M3U playlists.
 */
export class PipelineInput {
  constructor(private readonly sink: PipelineSink) {}

  async byGlob(pattern: string) {
    const sources = await PipelineInput.globAsync(pattern);
    await Promise.all(sources.map(value => this.byLocation(value)));
  }

  async byLocation(location: string) {
    const content = await fs.readFile(path.resolve(location), { encoding: 'utf8' });
    await this.sink.handleItems(parse(content).items);
  }

  private static globAsync: (pattern: string) => Promise<string[]> = promisify(glob);

}
