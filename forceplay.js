// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');
const yts = require('yt-search');

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)force-play" or "(your prefix)fp".
if (
  context.params.event.content.split(' ')[0].toLowerCase() ===
    `${process.env.PREFIX}force-play` ||
  context.params.event.content.split(' ')[0].toLowerCase() ===
    `${process.env.PREFIX}fp`
) {
  let searchString = context.params.event.content
    .split(' ')
    .slice(1)
    .join(' ')
    .trim();
  if (searchString) {
    let newTrack = await helpers.play(context.params.event, searchString, true);
    await helpers.sendPlayerUpdate(context.params.event, newTrack);
  }
}
