// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.channel_id !== null) {
  //someone joined a Voice Channel

  await lib.utils.kv['@0.1.16'].clear({
    key: `user_data_${context.params.event.user_id}_${context.params.event.guild_id}`, // required
  });

  let VCdata = await lib.utils.kv['@0.1.16'].get({
    key: `user_data_${context.params.event.user_id}_${context.params.event.guild_id}`,
  });

  VCdata = VCdata || [];

  VCdata.push(context.params.event.channel_id);

  await lib.utils.kv['@0.1.16'].set({
    key: `user_data_${context.params.event.user_id}_${context.params.event.guild_id}`,
    value: VCdata,
  });

  let content = [];

  VCdata.map((item, index) => {
    content.push(`${item}`);
  });
}
if (context.params.event.channel_id == null) {
  //Someone left a Voice Channel

  await lib.utils.kv['@0.1.16'].clear({
    key: `user_data_${context.params.event.user_id}_${context.params.event.guild_id}`, // required
  });

  let loop_user = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.guild_id}_loop_user`,
  });

  let if_loop = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.guild_id}_loop`,
  });
  if (context.params.event.user_id === `${loop_user}`) {
    await lib.utils.kv['@0.1.16'].clear({
      key: `${context.params.event.guild_id}_loop_user`,
    });
    await lib.utils.kv['@0.1.16'].clear({
      key: `${context.params.event.guild_id}_loop`,
    });
  }
}
