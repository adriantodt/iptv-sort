import { PipelineOutput } from './PipelineOutput';
import { PipelineFilter } from './PipelineFilter';
import { PipelineInput } from './PipelineInput';
import { PlaylistWriter } from './PlaylistWriter';

(async () => {
  const w = new PlaylistWriter('output/index.m3u');
  const o = new PipelineOutput(w);
  const f = new PipelineFilter(o);
  const i = new PipelineInput(f);

  await w.create();
  await i.byGlob('.iptv_channels/**/*.m3u');
})().catch(reason => {
  console.log('Error!', reason);
});
