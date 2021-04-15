const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: '리더보드',
    aliases: ["ㄹㄷㅂㄷ", "리더보드", "readerboard", "flejqhem"],
    description: '현재 랭킹 상태를 보여줘요',
    usage: '.리더보드',
    run: async (client, message, args, config) => {
      let page = 1, pageMax = 2;
        let embedJSON = {
            title: "리더보드",
            color: "GREEN",
            timestamp: new Date()
        }
        if (args[1]) {
            if (isNaN(args[1]) || Number(args[1]) > 20) {
                return message.reply("사용법 `.리더보드 (Number > 20 )`");
            }
            args[1] = Number(args[1]);
            if (args[1] <= 10) {
                let rankArr = await client.db.find().sort({money: -1}).limit(args[1]).toArray();
                let rankEmbed = await getRank(rankArr, client);
                rankEmbed.setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL());

                return message.channel.send(rankEmbed);
            } else {
                var rankArr = await client.db.find().sort({money: -1}).limit(args[1]).toArray();
                if (rankArr.length >= 11) {
                    var fields = await getRankFields(rankArr, client);
                    var fields = [fields.slice(0, 10), fields.slice(10)];
                    console.log(fields);
                    embedJSON.fields = fields[page - 1];
                    let pageMessage = await message.reply({embed: embedJSON});
                    pageMessage.react(`⬅`).then(() => pageMessage.react('➡'));

                    const backwardReactFilter = (reaction, user) => reaction.emoji.name == "⬅" && user.id === message.author.id;
                    const forwardReactFilter = (reaction, user) => reaction.emoji.name == "➡" && user.id === message.author.id;

                    const forward = pageMessage.createReactionCollector(forwardReactFilter, {tiem: 60000});
                    const backward = pageMessage.createReactionCollector(backwardReactFilter, {tiem: 60000});

                    forward.on('collect', async r => {
                        if (page == pageMax) return;
                        page += 1;
                        embedJSON.fields = fields[page - 1];
                        pageMessage.edit({embed: embedJSON});
                    });

                    backward.on('collect', async r => {
                        if (page == 1) return;
                        page -= 1;
                        embedJSON.fields = fields[page - 1];
                        pageMessage.edit({embed: embedJSON});
                    });
                    return;
                }
                let rankEmbed = await getRank(rankArr, client);
                rankEmbed.setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL());

                return message.channel.send(rankEmbed);
            }
        } else {
            let rankArr = await client.db.find().sort({money: -1}).limit(5).toArray();
            let rankEmbed = await getRank(rankArr, client);
            rankEmbed.setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL());

            return message.channel.send(rankEmbed);
        }
  }
}

const getRank = async (rankArr, client) => {
    let embed = new MessageEmbed()
    .setTitle(`리더보드`)
    .setColor('BLUE')
    .setTimestamp();

    for (let i in rankArr) {
        try {
            if (rankArr[i].money && !rankArr[i].ban) {
                const dscUSER = await client.users.fetch(rankArr[i]._id);
                embed.addField(`${Number(i) + 1}. ${dscUSER.tag}`, `${rankArr[i].money} 원`);
                continue;
            }
        } catch (e) {
            if (rankArr[i].money && !rankArr[i].ban) {
                embed.addField(`${Number(i) + 1}. ${"Unknown User"}`, `${rankArr[i].money}원`);
            } else {
                continue;
            }
        }
    }

    return embed;
}

const getRankFields = async (rankArr, client) => {
    let fields = [];

    for (let i in rankArr) {
        try {
            if (rankArr[i].money && !rankArr[i].ban) {
                const dscUSER = await client.users.fetch(rankArr[i]._id);
                fields.push({
                    name: `${Number(i) + 1}. ${dscUSER.tag}`,
                    value: `${rankArr[i].money}원`
                });
            }
        } catch (e) {
            if (rankArr[i].money && !rankArr[i].ban) {
                fields.push({
                    name: `${Number(i) + 1}. ${"Unknown User"}`,
                    value: `${rankArr[i].money}원`
                });
            } else {
                continue;
            }
        }
    }

    return fields;
}