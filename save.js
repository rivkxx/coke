// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../../helpers/shared.js');

let currentTrack = await lib.discord.voice['@0.0.1'].tracks.retrieve({
  guild_id: `${context.params.event.guild_id}`,
});

if (context.params.event.content.startsWith(`${process.env.PREFIX}unsave`)) {
  let saveList = await lib.utils.kv['@0.1.16'].get({
    key: `save_list_${context.params.event.author.id}`,
  });

  let index = saveList.indexOf(
    context.params.event.content.split(' ').slice(1).join(' ').trim()
  );

  if (index > -1) {
    saveList.splice(index, 1);
  }

  await lib.utils.kv['@0.1.16'].set({
    key: `save_list_${context.params.event.author.id}`,
    value: saveList,
  });

  let content = [];
  saveList.map((item, index) => {
    content.push(`${index + 1}: ${item}`);
  });

  await lib.discord.users['@0.0.6'].dms.create({
    recipient_id: context.params.event.author.id,
    content: ``,
    tts: false,
    embed: {
      type: 'rich',
      title: `You removed an item off your save list, here is your current save list:`,
      description: content.join('\n'),
      color: 0x6bbedd,
      footer: {
        text: `To remove an Item off your saved list say \`${process.env.PREFIX}unsave (SongName)\``,
      },
    },
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Check Your DM's, I have removed the song from the list.`,
    tts: false,
  });
}

if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}list`
) {
  let saveList = await lib.utils.kv['@0.1.16'].get({
    key: `save_list_${context.params.event.author.id}`,
  });

  let content = [];

  saveList.map((item, index) => {
    content.push(`${index + 1}: ${item}`);
  });

  await lib.discord.users['@0.0.6'].dms.create({
    recipient_id: context.params.event.author.id,
    content: ``,
    tts: false,
    embed: {
      type: 'rich',
      title: `Save List:`,
      description: content.join('\n'),
      color: 0x6bbedd,
      footer: {
        text: `To remove an Item off your saved list say \`${process.env.PREFIX}unsave (SongName)\``,
      },
    },
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Check Your DM's, I have sent you the list.`,
    tts: false,
  });
}

if (
  context.params.event.content.toLowerCase() === `${process.env.PREFIX}save`
) {
  if (!currentTrack.media_display_name) {
    await lib.discord.users['@0.0.6'].dms.create({
      recipient_id: context.params.event.author.id,
      content: ``,
      tts: false,
      embed: {
        type: 'rich',
        title: ' ',
        description: `There is no song currently playing`,
        color: 0x6bbedd, //pick a colour!
      },
    });
  } else if (currentTrack.media_display_name) {
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: ``,
      tts: false,
      embed: {
        type: 'rich',
        title: '✅ | Saved',
        description: `The current song has successfully been saved! To retrive your saved list say \`${process.env.PREFIX}list\``,
        color: 0x6bbedd, //pick a colour!
      },
    });

    let saveList = await lib.utils.kv['@0.1.16'].get({
      key: `save_list_${context.params.event.author.id}`,
    });

    saveList = saveList || [];

    saveList.push(currentTrack.media_display_name);

    await lib.utils.kv['@0.1.16'].set({
      key: `save_list_${context.params.event.author.id}`,
      value: saveList,
    });

    let content = [];

    saveList.map((item, index) => {
      content.push(`${index + 1}: ${item}`);
    });

    await lib.discord.users['@0.0.6'].dms.create({
      recipient_id: context.params.event.author.id,
      content: ``,
      tts: false,
      embed: {
        type: 'rich',
        title: `You added an item to your save list, here is your current save list:`,
        description: content.join('\n'),
        color: 0x6bbedd,
        footer: {
          text: `To remove an Item off your saved list say \`${process.env.PREFIX}unsave (SongName)\``,
        },
      },
    });
  }
}
