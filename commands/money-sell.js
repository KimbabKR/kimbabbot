
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: '매도',
    aliases: ["aoeh", "vksao", "vkaap", "판매"],
    usage: '.매도',
    run: async (client, message, args, config) => {
      let embed = new MessageEmbed()
                .setTitle('개발중이라 다음 정보를 보여드릴꼐요')
                .setColor("GREEN")
                .addField('JS 컴퍼니', `${(await client.dbstock.findOne({_id: "js"})).money}`)
                .addField('Int 전자', `${(await client.dbstock.findOne({_id: "int"})).money}`)
                .addField('Kcoin 은행', `${(await client.dbstock.findOne({_id: "kcoin"})).money}`)
                .addField('국밥 식품', `${(await client.dbstock.findOne({_id: "bab"})).money}`)
                .setTimestamp()
                .setFooter('확인한 시간')
      message.channel.send(embed)
    }
}