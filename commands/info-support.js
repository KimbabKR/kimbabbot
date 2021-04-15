const Discord = require('discord.js');
module.exports = {
    name: '지원서버',
    aliases: ['신고', '서포트', 'support', '문의', '지원서버', 'ansdml', 'tlsrh', 'tjqhxm', 'ansdml'],
    usage: '.지원서버',
    run: async (client, message, args, config) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('지원서버')
            .setDescription('[Team Kimbab](https://discord.gg/KbWvaNU) 서버에 참여해서 아래 혜택을 얻으세요')
            .addField(':date: 출석 체크 2배!', '매일 하루를 더블로 행복하게 시작하세요!')
            .addField(':newspaper: 사소한 업데이트', '버그가 고쳐젔거나, 밸런스 패치는 지원 서버에 공개합니다.')
            .setColor('GREEN')
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
}