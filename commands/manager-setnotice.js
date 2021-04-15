const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: '공지설정',
    aliases: ['공지설정', 'rhdwltjfwjd', '설정'],
    usage: '.공지설정 <#채널>',
    run: async (client, message, args, config) => {
        if (!message.member.hasPermission('MANAGE_GUILD') && !client.dev.includes(message.author.id)) return message.channel.send('서버 관리 권한이 필요해요.');
        if (!args.slice(1).join(' ')) return message.channel.send('채널을 멘션해주세요.');
        var ch;
        if (message.mentions.channels.first()) {
            ch = message.mentions.channels.first();
        } else {
            ch = null;
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지채널 등록 중`)
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(0xffff00)
            .addField('공지 채널 이름', ch.name || '없음', true)
            .addField('공지 채널이 속한 서버 이름', message.guild.name, true)
            .addField('진행 상황', '공지 파일을 가져오는 중', true)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        const notice = require('../assets/notice.json');
        if (!notice.channels[message.guild.id]) {
            notice.channels[message.guild.id] = '0';
        }
        const imbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 공지채널 등록 중`)
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(0xffff00)
            .addField('공지 채널 이름', ch.name || '없음', true)
            .addField('공지 채널이 속한 서버 이름', message.guild.name, true)
            .addField('진행 상황', '공지 파일을 수정하는 중', true)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        m.edit(imbed);
        if (ch) {
            notice.channels[message.guild.id] = ch.id;
        } else {
            delete notice.channels[message.guild.id]
        }
        fs.writeFile('./assets/notice.json', JSON.stringify(notice), function (err) {
            if (err) message.channel.send(`이런 오류가 났네요... \n 오류 내용 : ${err}`);
            const ymbed = new Discord.MessageEmbed()
                .setTitle(`공지채널을 등록했어요.`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(0x00ffff)
                .addField('공지 채널 이름', ch.name || '없음', true)
                .addField('공지 채널이 속한 서버 이름', message.guild.name, true)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit(ymbed);
        });
    }
}