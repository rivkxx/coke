// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//RADIO get's the information for what channel for the bot to join or leave.
let RADIO = await lib.utils.kv['@0.1.16'].get({
  key: `user_data_${context.params.event.author.id}_${context.params.event.guild_id}`,
  });

console.log(RADIO);
//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)summon".
if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}summon`
) {
  if (!RADIO) {
  await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${event.channel_id}`,
  content: `You need to be in a VC to use this command.`,
  });
  } else
  if (RADIO) {
  let result = await lib.discord.voice['@0.0.1'].channels.join({
    channel_id: `${RADIO}`, // required
    guild_id: `${context.params.event.guild_id}`, // required
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ``,
    tts: false,
    embed: {
      type: 'rich',
      title: 'I have been summoned!',
      description: `I have joined <#${RADIO}>, to start playing music say \`${process.env.PREFIX}play <Name or Link>\`!!`,
      color: 0x00aa00, //pick a colour!
    },
  });
}
}
