const Discord = require('discord.js');
module.exports = {
    name: '가입',
    aliases: ['join', 'ㅓㅐㅑㅜ', 'rkdlq'],
    usage: '.가입',
    run: async (client, message, args, config) => {
        if (await client.db.findOne({_id: message.author.id})) {
            message.channel.send('[ERROR] 이미 가입된 유저입니다.')
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('정말 가입할까요?')
                .setDescription('가입시 개인정보 수집에 동의하는것으로 간주합니다.')
                .setColor('YELLOW')
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            let m = await message.channel.send({
                embed: embed
            });
            await m.react('✅');
            await m.react('❌');
            const filter = (r, u) => u.id == message.author.id && (r.emoji.name == '✅' || r.emoji.name == '❌');
            const collector = m.createReactionCollector(filter, {
                max: 1
            });
            collector.on('end', async collected => {
                if (collected.first().emoji.name == '✅') {
                await client.db.insertOne({_id: message.author.id, money: 0, level: 0, xp: 0, item: [], ban: false, lastTakeRoll : 0});
                    embed.setTitle('가입 완료!')
                      .setDescription('이제 김밥봇 돈기능을 사용할수 있어요.')
                      .setColor('GREEN')
                      .setTimestamp()
                    m.edit({
                        embed: embed
                    })
                } else {
                    embed.setTitle('가입이 취소되었어요.')
                    .setDescription('')
                    .setColor('RED')
                    .setTimestamp()
                    m.edit({
                        embed: embed
                    });
                }
            });
        }
    }
}