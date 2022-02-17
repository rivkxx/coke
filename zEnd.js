// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

//This checks if there is a loop going, if there is it replays the looped song.
let loop = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_loop`,
});
if (loop) {
  let yt = await yts(`${loop}`);
  let downloadInfo = await ytdl.getInfo(yt.all[0].url);
  let response = await lib.discord.voice['@0.0.0'].tracks.play({
    channel_id: `${context.params.event.channel_id}`,
    guild_id: `${context.params.event.guild_id}`,
    download_info: downloadInfo,
  });
  return;
}

//if there is no loop going then it will check if there is a queue, if there is no queue it will wait 2 minutes before leaving the VC.
let nextTrack = await helpers.dequeueTrack(context.params.event);
if (nextTrack) {
  await helpers.play1(context.params.event, nextTrack.youtube_link, false);
}
