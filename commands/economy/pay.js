const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "pay",
  noalias: [""],
  category: "economy",
  description: "Pay to Somebody",
  usage: "[mention | ID] <amount>",
  accessableby: "everyone"
  ,
  run: async (client, message, args) => {
    try {
      let user2 = message.author
      if (!args[0]) return message.channel.send("**Please Enter A User!**");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!user) return message.channel.send("**Enter A Valid User!**");

      let member = db.fetch(`money_${user2.id}`);

      let embed1 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`❌ Mention someone to pay`);

      if (!args[0]) {
        return message.channel.send({ embeds: [embed1] });
      }
      let embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`❌ You cannot pay yourself`);

      if (user.user.id === message.author.id) {
        return message.channel.send({ embeds: [embed2] });
      }

      let embed3 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`❌ Specify an amount to pay`);

      if (!args[1]) {
        return message.channel.send({ embeds: [embed3] });
      }
      let embed4 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`❌ Enter A Valid Amount!`);

      if (isNaN(args[1])) {
        return message.channel.send({ embeds: [embed4] });
      }
      let embed5 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`❌ You don't have that much money`);

      if (member < args[1]) {
        return message.channel.send({ embeds: [embed5] });
      }

      let embed6 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`✅ You have payed ${user.displayName} ${args[1]} coins`);

      message.channel.send({ embeds: [embed6] });
      db.add(`money_${user.id}`, args[1]);
      db.subtract(`money_${user2.id}`, args[1]);
    } catch {

    }
  }
};