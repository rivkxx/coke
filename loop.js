// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)loop".
if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}loop`
) {
  //This checks to see if there is already a loop for the guild.
  let loop = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.guild_id}_loop`,
  });

  //If there curently is no loop then it loops the current track.
  if (!loop) {
    let response = await lib.discord.voice['@0.0.0'].tracks.retrieve({
      guild_id: `${context.params.event.guild_id}`,
    });
    await lib.utils.kv['@0.1.16'].set({
      key: `${context.params.event.guild_id}_loop`,
      value: `${response.media_display_name}`,
    });
    await lib.utils.kv['@0.1.16'].set({
      key: `${context.params.event.guild_id}_loop_user`,
      value: `${context.params.event.author.id}`,
    });
    await lib.discord.channels['@0.2.0'].messages.create({
      guild_id: `${context.params.event.guild_id}`,
      channel_id: context.params.event.channel_id,
      content: `Song now looped. To unloop say \`${process.env.PREFIX}unloop\``,
    });
  }

  //If there is already a loop for this server then it will not loop the track.
  if (loop) {
    await lib.discord.channels['@0.2.0'].messages.create({
      guild_id: `${context.params.event.guild_id}`,
      channel_id: context.params.event.channel_id,
      content: `There is already a song currently looped.`,
    });
  }
}
