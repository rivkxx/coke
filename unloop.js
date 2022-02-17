// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)unloop".
if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}unloop`
) {
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.guild_id}_loop`,
  });
  await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.guild_id}_loop_user`,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    guild_id: `${context.params.event.guild_id}`,
    channel_id: context.params.event.channel_id,
    content: `Song now un-looped.`,
  });
}
