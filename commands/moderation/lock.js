const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   category: "moderation",
   description: "Locks a Channel"
}
run: async (client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
      return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
      {
         id: message.guild.id,
         deny: ['SEND_MESSAGES'],
      },
   ],);
   const embed = new Discord.EmbedBuilder()
      .setTitle("Channel Updates")
      .setDescription(`ðŸ”’ ${message.channel} has been Locked`)
      .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
