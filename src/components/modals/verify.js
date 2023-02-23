const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: 'verify-captcha'
    },
    async execute(interaction, client) {
        const input = interaction.fields.getTextInputValue('captcha');
        const captchaText = await db.get(`verified_${interaction.guild.id}.${interaction.user.id}.text`);


        if (input == captchaText) {
            let captchaCorrect = new EmbedBuilder()
                .setTitle("✅ CAPTCHA Solved!")
                .setDescription(`${interaction.user}, you completed the CAPTCHA successfully, and you have been given access to **${interaction.guild.name}**!`)
                .setTimestamp()
                .setColor("Green")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
            await db.set(`verified_${interaction.guild.id}.${interaction.user.id}verified`, true)
            interaction.reply({ embeds: [captchaCorrect], ephemeral: true });
        } else {
            let captchaIncorrect = new EmbedBuilder()
                .setTitle("❌ You Failed to Complete the CAPTCHA!")
                .setDescription(`${interaction.user}, you failed to solve the CAPTCHA!\n\nCAPTCHA Text: **${text}**`)
                .setTimestamp()
                .setColor("Red")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
            interaction.reply({ embeds: [captchaIncorrect], ephemeral: true });

        }
    }
};