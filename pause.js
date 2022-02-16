// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');
const yts = require('yt-search');

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)pause".
if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}pause`
) {
  let trackData = await lib.discord.voice['@0.0.1'].tracks.pause({
    guild_id: `${context.params.event.guild_id}`,
  });
  await helpers.sendPlayerUpdate(context.params.event, trackData);
}
