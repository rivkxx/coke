//I added this lyrics snippet: https://autocode.com/snippet/ctks/cachsnpt_LcBnT6nUDf8EqZ8p1izj3dxPk26XZT3Se1iF/ to the music bot because I thought it was a cool snippet || DM CTK for questions not skyler.

// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//This is the main fuction for this file, it checks to see if the message starts with "(your prefix)lyrics (song)".
if (context.params.event.content.startsWith(`${process.env.PREFIX}lyrics`)) {
  const name = context.params.event.content
    .split(' ')
    .slice(1)
    .join(' ')
    .trim();
  if (!name)
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Please provide the song name!`,
      message_reference: {
        message_id: context.params.event.id,
      },
    });

  const song = await lib.ctks['genius-lyrics']['@1.0.2']({name});
  if (!song || !song.lyrics)
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Sorry!, i was unable to find any song with given name.`,
      message_reference: {
        message_id: context.params.event.id,
      },
    });

  await lib.discord.channels['@0.1.2'].messages.create({
    content: ``,
    channel_id: context.params.event.channel_id,
    embed: {
      title: song.title,
      color: song.song_art_primary_color
        ? parseInt(song.song_art_primary_color.replace('#', '0x'))
        : 0xffffff,
      thumbnail: {url: song.song_art_image_url},
      description: song.lyrics,
    },
  });
}
