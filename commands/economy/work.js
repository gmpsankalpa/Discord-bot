const db = require('quick.db')
const { EmbedBuilder } = require('discord.js')
const ms = require("parse-ms");
const Jwork = require('../../JSON/works.json');
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

module.exports = {

    name: "work",
    aliases: ["wr"],
    category: "economy",
    description: "Work to Earn Money",
    usage: " ",
    accessableby: "everyone"
    ,
    run: async (client, message) => {

        let user = message.author;
        let author = await db.fetch(`work_${user.id}`)

        let timeout = 1800000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send({ embeds: [timeEmbed] })
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;
            let embed1 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ **${JworkR} ${amount}**`)
            message.channel.send({ embeds: [embed1] })

            db.add(`works_${user.id}`, 1)
            db.add(`money_${user.id}`, amount)
            db.set(`work_${user.id}`, Date.now())
        };
    }
};