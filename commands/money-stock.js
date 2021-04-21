
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
  name: '주식',
  aliases: ["wntlr", "stock", "주가", "가격"],
  usage: '.주식',
  run: async (client, message, args, config) => {

    
    let embed = new MessageEmbed()
                .setTitle('주식 상황')
                .setColor("GREEN")
                .addField('JS 컴퍼니', `${(await client.dbstock.findOne({_id: "js"})).money}`)
                .addField('Int 전자', `${(await client.dbstock.findOne({_id: "int"})).money}`)
                .addField('Kcoin 은행', `${(await client.dbstock.findOne({_id: "kcoin"})).money}`)
                .addField('국밥 식품', `${(await client.dbstock.findOne({_id: "bab"})).money}`)
								.addField('Control Delta', `${(await client.dbstock.findOne({_id: "cd"})).money}`)
								.addField('크라운 제과', `${(await client.dbstock.findOne({_id: "kraun"})).money}`)
                .setTimestamp()
                .setFooter('확인한 시간')
      message.channel.send(embed)
  }
}