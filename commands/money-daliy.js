const Discord = require('discord.js');

module.exports = {
    name: '출첵',
    aliases: ['출석체크', 'ㅊㅊ', '돈받기', 'cnfcjrcpzm', 'cnfcpr', 'cc'],
    description: '현재 랭킹 상태를 보여줘요',
    usage: '.출첵',
    run: async (client, message, args, config) => {
      if (!(await client.db.findOne({_id: message.author.id}))) {
            const embed = new Discord.MessageEmbed()
                .setTitle('김밥봇의 돈 서비스에 가입되어있지 않아요.')
                .setDescription('.가입 을 사용해서 먼저 가입해주세요!')
                .setColor('RED')
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed);
      } else {
      let 배수 = 1;
      if (message.guild.id == "740794177255768136") {
        message.member.roles.cache.forEach(role => {
            if (role.id == "740794435830546474") 배수=2;
        });
      }
      let userDB = await client.db.findOne({_id: message.author.id});
      const today = new Date().getDate();
      if (!userDB.lastTakeRoll || userDB.lastTakeRoll != today) {
          let random = Math.floor(Math.random() * 10000);
          if (random == 0) random = 1;
          let total = (userDB.money + random) * 배수;
          client.db.findOneAndUpdate({_id: message.author.id}, {
              $set: {
                  lastTakeRoll: today,
                  money: total,
              }
          })
          return  message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`성공적으로 ${random}원을 지급되었습니다.`)
                  .setDescription(`[지원 서버](https://discord.gg/KbWvaNU)에 참가하면 2배로 받을수 있어요!`)
                  .setColor('GREEN')
                  .setFooter(message.author.tag, message.author.displayAvatarURL())
                  .setTimestamp());
        } else {
            return message.channel.send('출석체크는 하루에 한번만 가능합니다');
        }
      }
   }
}