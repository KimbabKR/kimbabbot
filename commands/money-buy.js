const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

function find(str) {
    var s = [
        { id: 'js', name: 'JavaScript 컴퍼니', alias: '자스' },
        { id: 'int', name: '인트전자', alias: '폰' },
        { id: 'bab', name: '국밥식품', alias: '밥' },
        { id: 'cd', name: 'Control Delta', alias: '델타' },
        { id: 'kcoin', name: 'Kcoin 은행', alias: '코인' },
				{ id: 'kraun', name: '크라운 제과', alias: '떡먹기' },
    ]
    return s.filter(r => r.id.includes(str) || r.name.includes(str))
}

module.exports = {
    name: '매수',
    aliases: ["구매", "rnao", "tkrl", "buy", "매수"],
    usage: '.매수',
    run: async (client, message, args, config) => {
       if (args[1] == undefined) {
            return message.reply('사용법: ```.매수 [주식 이름] (0 이상의 숫자 Infinity 이하)```');
        }
				const res = find(args[1])

				if (!res || res.length === 0) {
					return message.reply('해당 주식이 없습니다. `.주식`으로 주식 상황을 보고 오시는건 어떨까요?')
				} else if (res.length > 1) {
					const count = res.length
					const items = res.map(r => r.name + '\n').join('')
					return message.reply(` \`${count}\`건이 검색되었습니다. 이름을 더 정확하게 입력해주세요. 검색결과 : \n\`\`\`${items}\`\`\``)
				}

				const user = await client.db.findOne({ _id : message.author.id})
				const stock = await client.dbstock.findOne({ _id : res[0].id})
				var items = user.stock

				var num = 0
				var dived = 0
				var total = 0
				if (['전부', '올인', '모두', 'all', '올'].includes(args[2])) {
						num = parseInt(Number(user.money) / Number(stock.money), 10)
						total = num * stock.money
						dived = Number(user.money) - total
				} else if (['반인', '반', 'half'].includes(args[2])) {
						num = parseInt(Number(user.money) / 2 / Number(stock.money), 10)
						total = num * stock.money
						dived = Number(user.money) - total
				} else if (
						isNaN(Number(args[2])) || !Number.isInteger(Number(args[2])) || Number(args[2]) < 1 || Number(args[2]) == Infinity
				) {
						return message.reply('사용법: ```.매수 [주식 이름] (0 이상의 숫자 Infinity 이하)```')
				} else {
						num = Number(args[2])
						total = num * stock.money
						dived = Number(user.money) - total
				}
				if (dived < 0) {
					return message.reply('매수할 돈이 없습니다.')
				}

				if (!items[res[0].id]) items[res[0].id] = num
    			else items[res[0].id] += num
				if(total/10000000000000000000 > Number(user.money)) 
					return message.reply('돈이 많은데 너무 적게 사시네요. 취소합니다.')
				const chkBuy = new MessageEmbed()
                .setTitle('🧾청구서')
                .setDescription(`매수하려는 주식 : ${res[0].name}\n수량 : ${num.formatIt()}\n지불할 금액 : ${total.formatIt()} :coin:\n계속하시려면 💳 이모지로 반응하세요.`)
                .setTimestamp()
								.setColor("YELLOW")
								.setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL({
                    dynamic: true,
                }));
				var ask = await message.channel.send(chkBuy)

				const filter = (reaction, u) =>
        	reaction.emoji.name === '💳' && u.id === message.author.id;
				ask.then(async m => {
						m.react('💳')
						m.awaitReactions(filter, { max: 1, time: 10000, error: ['time'] }).then(
								async collected => {
										if (collected.size === 0) {
												return embed.setTitle('시간 초과')
																.setDescription('구매가 취소 되었습니다.')
																.setColor('RED')
																.setTimestamp()
																m.edit({
																		embed: embed
																});
										}
								embed.setDescription(`주식 : ${res[0].name}\n수량  : ${num.formatIt()}주\n지불한 금액 : ${total.formatIt()} :coin:\n잔고 : ${dived.formatIt()} :coin:`)
                .setColor('GREEN')
								.setTimestamp()
								m.edit({
										embed: embed
								});
						})
				})
				message.channel.send(`[200] OK Money : ${user.money} Stock : ${stock.money}`)
						
    }
}