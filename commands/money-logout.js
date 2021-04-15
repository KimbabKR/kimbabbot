const Discord = require('discord.js');

module.exports = {
    name: '탈퇴',
    aliases: ['logout', '나가기', 'xkfxhl'],
    usage: '.탈퇴',
    run: async (client, message, args, config) => {
        if (!(await client.db.findOne({_id: message.author.id}))) {
            message.channel.send('가입되지 않은 유저에요!\n.가입 으로 가입하세요!')
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('정말 탈퇴할까요?')
                .setDescription('탈퇴하시면 모든데이터가 삭제됩니다.')
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
                    await client.db.deleteOne({_id: message.author.id});
                    embed.setTitle('탈퇴 완료!')
                    .setDescription('')
                    .setColor('RED')
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
                    m.edit({
                        embed: embed
                    });
                } else {
                    embed.setTitle('탈퇴가 취소되었어요.')
                    .setColor('GREEN')
                    .setTimestamp()
                    m.edit({
                        embed: embed
                    });
                }
            });
        }
    }
}