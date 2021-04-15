const Discord = require('discord.js');

module.exports = {
    name: '초대링크',
    aliases: ['링크', 'fldzm', 'cheofldzm', 'cheo', '초대', '링크들', 'invite'],
    usage: '.초대링크',
    run: async (client, message, args, config) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('잠시만 기다려 주세요')
            .setColor('YELLOW')
            .setTimestamp()
        let m = await message.channel.send({
            embed: embed
        });
        embed.setTitle('김밥봇 링크들')
            .setColor('GREEN')
            .setTimestamp()
            .addField('봇 초대링크', `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=388160&scope=bot`)
            .addField('지원서버', `https://discord.gg/KbWvaNU`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
        m.edit({
            embed: embed
        });
     }
}