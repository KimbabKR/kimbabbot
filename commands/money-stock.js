
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
  name: '주식',
  aliases: ["wntlr", "stock", "주가", "가격"],
  usage: '.주식',
  run: async (client, message, args, config) => {

    if (!message.data.arg[1]) {
      return message.reply("올바른 사용법\n```css\n.매도 [주식이름] [수량]\n```")
    }

    const stock = await client.dbstock.findOne
    if (['전부', '올인', '모두', 'all', '올'].includes(message.data.arg[1])) {
      num = all
      total = num * stock.money
      mon = Number(user.money) + total
    } else if (['반인', '반', '절반', 'half'].includes(message.data.arg[1])) {
      num = Math.floor(all / 2)
      total = num * stock.money
      mon = Number(user.money) + total
    } else if (
      isNaN(Number(message.data.arg[1])) ||
      !Number.isInteger(Number(message.data.arg[1])) ||
      Number(message.data.arg[1]) < 1
    ) {
      return message.reply("해당 주식이 없습니다. 올바른 이름 또는 이름의 일부를 입력해주세요.")
    } else {
      let embed = new MessageEmbed()
        .setTitle('주식 상태')
        .setColor("GREEN")
        .addField('JS 컴퍼니', `${(await client.dbstock.findOne({ _id: "js" })).money}`)
        .addField('Int 전자', `${(await client.dbstock.findOne({ _id: "int" })).money}`)
        .addField('Kcoin 은행', `${(await client.dbstock.findOne({ _id: "kcoin" })).money}`)
        .addField('국밥 식품', `${(await client.dbstock.findOne({ _id: "bab" })).money}`)
        .setTimestamp()
        .setFooter('확인한 시간')
      message.channel.send(embed)
    }
  }
}