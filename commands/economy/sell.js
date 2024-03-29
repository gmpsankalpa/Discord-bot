const { EmbedBuilder } = require('discord.js');
const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {

    name: "sell",
    noalias: [""],
    category: "economy",
    description: "Sell to somebody",
    usage: "[mention | ID] <amount>",
    accessableby: "everyone"
    ,
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`);
        if (!prefix) {
            prefix = default_prefix;
        }
        let user = message.author;

        if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let embed1 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You don't have Nikes to sell`);

            let nikees = await db.fetch(`nikes_${user.id}`)

            if (nikees < 1) return message.channel.send({ embeds: [embed1] })

            db.fetch(`nikes_${user.id}`)
            db.subtract(`nikes_${user.id}`, 1)

            let embed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Sold Fresh Nikes For 600 Coins`);

            db.add(`money_${user.id}`, 600)
            message.channel.send({ embeds: [embed2] })
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You don't have a Car to sell`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send({ embeds: [embed3] })

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Sold a Car For 800 Coins`);

            db.add(`money_${user.id}`, 800)
            message.channel.send({ embeds: [embed4] })
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You don't have a Mansion to sell`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send({ embeds: [sembed2] })

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Sold a Mansion For 1200 Coins`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send({ embeds: [sembed3] })
        } else {
            if (message.content.toLowerCase() === `${prefix}sell`) {
                let embed9 = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`❌ Enter an item to sell. Type ${prefix}shop to see list of items`)
                return message.channel.send({ embeds: [embed9] })
            } else {
                return message.channel.send("**Not A Valid Item!**")
            }
        }
    }
}