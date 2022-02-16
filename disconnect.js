// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');

//RADIO get's the information for what channel for the bot to join or leave.
let RADIO = await lib.utils.kv['@0.1.16'].get({
  key: `user_data_${context.params.event.author.id}_${context.params.event.guild_id}`,
});

console.log(RADIO);

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)disconnect".
if (
  context.params.event.content.toLowerCase() ===
  `${process.env.PREFIX}disconnect`
) {
  let response = await lib.discord.voice['@0.0.1'].channels.disconnect({
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ` `,
    embeds: [
      {
        type: 'rich',
        description: `Disconnected from <#${RADIO}>!`,
        color: 0x6bbedd,
      },
    ],
  });
}
