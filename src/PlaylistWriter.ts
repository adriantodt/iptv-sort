import path from 'path';
import * as fs from 'fs-extra';

export class PlaylistWriter {
  private readonly location: string;

  constructor(location: string) {
    this.location = path.resolve(location);
  }

  async create() {
    await fs.mkdir(path.resolve(path.dirname(this.location)), { recursive: true });
    await fs.writeFile(this.location, '', { encoding: 'utf8', flag: 'w' });
  }

  async writeHeaders(attrs: Record<string, string>) {
    let header = `#EXTM3U`
    for (const name in attrs) {
      const value = attrs[name]
      header += ` ${name}="${value}"`
    }
    header += `\n`

    await fs.appendFile(this.location, header);
  }

  async writeLink(
    url: string,
    title: string,
    attrs: Record<string, string | undefined>,
    vlcOpts: Record<string, string | undefined>,
  ) {
    let link = `#EXTINF:-1`
    for (const name in attrs) {
      const value = attrs[name]
      if (value !== undefined) {
        link += ` ${name}="${value}"`
      }
    }
    link += `,${title}\n`
    for (const name in vlcOpts) {
      const value = vlcOpts[name]
      if (value !== undefined) {
        link += `#EXTVLCOPT:${name}=${value}\n`
      }
    }
    link += `${url}\n`

    await fs.appendFile(this.location, link);
  }
}
