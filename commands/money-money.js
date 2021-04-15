const Discord = require('discord.js');
module.exports = {
    name: '지갑',
    aliases: ['money', 'ㅡㅐㅜ됴', 'ehs', '돈', 'wlrkq'],
    usage: '.지갑',
    run: async (client, message, args, config) => {
        if (!(await client.db.findOne({_id: message.author.id}))) {
            const embed = new Discord.MessageEmbed()
                .setTitle('김밥봇의 돈 서비스에 가입되어있지 않아요.')
                .setDescription('.가입 을 사용해서 먼저 가입해주세요!')
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed);
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}님의 지갑`)
            .setDescription(`지금 ${(await client.db.findOne({_id: message.author.id})).money}원을 갖고 있네요.`)
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            message.channel.send(embed);
        }
    }
}