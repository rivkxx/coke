// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');
const yts = require('yt-search');

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)music-info".
if (
  context.params.event.content.toLowerCase() ===
  `${process.env.PREFIX}music-info`
) {
  let server = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: context.params.event.guild_id // required
  });
  console.log(server.name);
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ` `,
    embeds: [
      {
        type: 'rich',
        title: `${server.name}, Music Information/Commands`,
        description: [
          `**You are using \`Simple Music-Bot\` Version \`1.2.1\`**\n`,
          `\`${process.env.PREFIX}music-info\`: Shows you this list of music commands.`,
          `\`${process.env.PREFIX}play/p <name or link>\`: Play the YouTube Song`,
          `\`${process.env.PREFIX}force-play/fp <name or link>\`: Plays a YouTube song right away, even if there is a song currently playing.`,
          `\`${process.env.PREFIX}pause\`: Pause the currently playing track`,
          `\`${process.env.PREFIX}summon\`: Adds the bot to the VC.`,
          `\`${process.env.PREFIX}disconnect\`: Disconnect the bot from the voice channel`,
          `\`${process.env.PREFIX}nowplaying\`: Retrieve the current track and queued tracks`,
          `\`${process.env.PREFIX}lyrics <song>\`: Retrieve the lyrics for a song that have under 200 words. (Due to discord limtations)`,
          `\`${process.env.PREFIX}skip\`: Skip currently playing track and play the next track in the queue`,
          `\`${process.env.PREFIX}clearqueue\`: Clear the current queue`,
          `\`${process.env.PREFIX}loop\`: Loops the current track until unmuted.`,
          `\`${process.env.PREFIX}unloop\`: unloops all tracks.`,
          `\`${process.env.PREFIX}save\`: saves a song to your favorites. Use this command when a song is being played in VC and you want to save it.`,
          `\`${process.env.PREFIX}unsave <name>\`: Removes a song from your favorites.`,
          `\`${process.env.PREFIX}list\`: Show's you a list of all your saved songs.`,
        ].join('\n'),
        color: 0x6bbedd,
        footer: {
          text: `This music bot was created with the help from: 𝐃𝐚𝐌𝐲𝐬𝐭𝐢𝐜𝐒𝐤𝐲𝐥𝐞𝐫#4247, using the resources of autocode.com | DM him if you have questions.`,
        },
      },
    ],
  });
}
