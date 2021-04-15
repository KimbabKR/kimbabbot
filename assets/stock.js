const Discord = require('discord.js');

function stock(client){
      /*client.dbstock.findOneAndUpdate({_id: bab}, {$set: { money: float2int(Math.random() * ((min) * (-2)) + (min)) + stock)}}) 
  */
  

/*
      DB 저장
*/
    const min = 40 - 10;
    const stock = 40;
    function float2int (value) {
      return value | 0;
    }
    setInterval(() => {
      client.dbstock.findOneAndUpdate({_id: bab}, {$set: { money: (float2int(Math.random() * ((min) * (-2)) + (min)) + stock) }})

      client.dbstock.findOneAndUpdate({_id: kcoin}, {$set: { money: (float2int(Math.random() * ((min) * (-2)) + (min)) + stock) }})

      client.dbstock.findOneAndUpdate({_id: int}, {$set: { money: (float2int(Math.random() * ((min) * (-2)) + (min)) + stock) }})

      client.dbstock.findOneAndUpdate({_id: js}, {$set: { money: (float2int(Math.random() * ((min) * (-2)) + (min)) + stock) }})
    }, 600000);

/* 
      DB 불러오기
*/
    setInterval(() => { 
        client.channels.cache.get("828866735896920064").send(`날짜 ${new Date()}\n국밥식품 : ` + client.dbstock.findOne({_id: 'bab'}).money ) 
    }, 600000);
    client.channels.cache.get("828866735896920064").send("국밥식품 : " + client.dbstock.findOne({_id: 'bab'}).money ) 

    setInterval(() => { 
        client.channels.cache.get("828866735896920064").send("KCoin : " + client.dbstock.findOne({_id: 'kcoin'}).money )
    }, 600000)
    client.channels.cache.get("828866735896920064").send("KCoin : " + client.dbstock.findOne({_id: 'kcoin'}).money);


    setInterval(() => {
        client.channels.cache.get("828866735896920064").send("인트전자 : " + (float2int(Math.random() * ((min) * (-2)) + (min)) + stock));
    }, 600000)
    client.channels.cache.get("828866735896920064").send("인트전자 : " + (float2int(Math.random() * ((min) * (-2)) + (min)) + stock));


    setInterval(() => {
        client.channels.cache.get("828866735896920064").send("JS 프로그래밍 : " + (float2int(Math.random() * ((min) * (-2)) + (min)) + stock));
    }, 600000)
    client.channels.cache.get("828866735896920064").send("JS 프로그래밍 : " + (float2int(Math.random() * ((min) * (-2)) + (min)) + stock));
}

module.exports = stock;