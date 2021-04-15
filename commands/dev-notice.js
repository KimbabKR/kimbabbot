const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js')
const {discord} = require('discord.js')

module.exports = {
    name: '공지',
    aliases: ['post', 'rhdwl', '발행'],
    description: '공지를 보낸다',
    usage: '.공지 <내용>',
    run: async (client, message, args, config) => {
        var toSend = args.slice(1).join(' ');
        if (!client.dev.includes(message.author.id)) return;
        if (!args.slice(1).join(' ')) return message.channel.send('공지 내용을 알려주세요.');
        const notice = require('../assets/notice.json');
        const prompt = new Discord.MessageEmbed()
            .setTitle('공지를 전송할까요?')
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(0xffff00)
            .addField('전송할 내용', toSend, true)
            .addField('전송자', message.author.tag, true)
            .addField('전송할 서버들', `${client.channels.cache.get(notice.channels).name}`, true)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let p = await message.channel.send(prompt);
        p.react('✅');
        p.react('❌');
        const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id;
        const collector = p.createReactionCollector(filter, {
            time: 10000,
            max: 1
        });
        collector.on('end', async function (collected) {
            if (collected && collected.first() && collected.first().emoji.name == '✅') {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지 전송 중`)
                    .setColor(0xffff00)
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField('전송할 내용', toSend, true)
                    .addField('진행 중인 작업', '공지 채널을 불러오는 중', true)
                    .setFooter(message.author.tag, message.author.avatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                p.edit(embed);
                
                var i = 0;
                var a = 0;
                for (var x in notice.channels) {
                    a++;
                }
                for (var x in notice.channels) {
                    if (client.channels.cache.get(notice.channels[x])) {
                    client.channels.cache.get(notice.channels[x]).send(new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} 공지`)
                        .setColor(0x00ffff)
                        .setThumbnail(client.user.displayAvatarURL({
                            dynamic: true
                        }))
                        .setDescription(toSend + "\n🔗 [Team Kimbab](https://discord.gg/KbWvaNU)\n🔗 [김밥봇 추천하기](https://koreanbots.dev/bots/821631399836385280) \n🔗 [KimbabKR Github](https://github.com/kimbabkr/)\n🔗 [김밥봇 초대하기](https://discord.com/api/oauth2/authorize?client_id=821631399836385280&permissions=3533889&scope=bot)")
                        .setFooter(message.author.tag, message.author.avatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                    );
                    }
                    i++;
                    if (client.channels.cache.get(notice.channels[x])) {
                    const imbed = new Discord.MessageEmbed()
                        .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지 전송 중`)
                        .setColor(0xffff00)
                        .setThumbnail(client.user.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField('전송할 내용', toSend, true)
                        .addField('진행 중인 작업', `전송 중`, true)
                        .addField('현재 진행도', `${i}/${a}개 채널 전송 완료`, true)
                        .addField('현재 전송 중인 채널', `${client.channels.cache.get(notice.channels[x]).name}(${client.channels.cache.get(notice.channels[x]).id})`, true)
                        .setFooter(message.author.tag, message.author.avatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                    p.edit(imbed);
                    }
                }
                const ymbed = new Discord.MessageEmbed()
                    .setTitle(`공지를 전송했어요.`)
                    .setColor(0x00ffff)
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField('공지 내용', toSend, true)
                    .addField('전송한 채널 수', `${i}개`, true)
                    .setFooter(message.author.tag, message.author.avatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                p.edit(ymbed);
            } else {
                const cancled = new Discord.MessageEmbed()
                    .setTitle('공지 전송이 취소되었어요.')
                    .setColor(0xff0000)
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField('전송 예정이었던 내용', toSend, true)
                    .setFooter(message.author.tag, message.author.avatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                p.edit(cancled);
            }
            p.reactions.removeAll();
        });     
    }
}
