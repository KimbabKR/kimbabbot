const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
const prefix = config.prefix;
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Load Status');
const ktoken = process.env.KTOKEN;
require('dotenv').config();

client.dev = ['552103947662524416', '393674169243402240'];
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.db = {};
client.dbstock = {};
/*
    DataBase
*/
const MongoDB = require('mongodb');
const DBClient = new MongoDB.MongoClient(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

DBClient.connect().then(() => {
	client.db = DBClient.db('bot').collection('main');
	client.dbstock = DBClient.db('bot').collection('stock');
	console.log(`[System] MongoDB Connected`);
});

/*
  Handler
*/
fs.readdir('./commands/', (err, list) => {
	for (let file of list) {
		try {
			let pull = require(`./commands/${file}`);
			if (pull.name && pull.run && pull.aliases) {
				table.addRow(file, '✅');
				for (let alias of pull.aliases) {
					client.aliases.set(alias, pull.name);
				}
				client.commands.set(pull.name, pull);
			} else {
				table.addRow(file, '❌ -> Error');
				continue;
			}
		} catch (e) {
			table.addRow(file, `❌ -> ${e}`);
			continue;
		}
	}
	console.log(table.toString());
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	let args = message.content
		.substr(prefix.length)
		.trim()
		.split(' ');
	if (client.commands.get(args[0])) {
		client.commands.get(args[0]).run(client, message, args);
	} else if (client.aliases.get(args[0])) {
		client.commands.get(client.aliases.get(args[0])).run(client, message, args);
	} else {
		let s = 0;
		let sname = undefined;
		let typed = args[0];
		let valids = [];
		for (let x of client.commands.array()) {
			for (let y of x.aliases) {
				valids.push(y);
			}
			valids.push(x.name);
		}
		for (let curr of valids) {
			let cnt = 0;
			let i = 0;
			for (let curlet of curr.split('')) {
				if (
					curlet[i] &&
					typed.split('')[i] &&
					curlet[i] == typed.split('')[i]
				) {
					cnt++;
				}
				i++;
			}
			if (cnt > s) {
				s = cnt;
				sname = curr;
			}
		}
	}
});

/*
    Im Ready!
*/
client.on('ready', () => {
	console.log(`[System] Logged in as ${client.user.username}`);
	setInterval(() => {
		switch (Math.floor(Math.random() * 6)) {
			case 0:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `${client.guilds.cache.size}개의 서버에서 활동중`,
						type: 'PLAYING'
					}
				});
				break;
			case 1:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `5. 4. 3. 2. 1. ㅃㅇ`,
						type: 'PLAYING'
					}
				});
				break;
			case 2:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `글로벌 접두사는 . 입니다!`,
						type: 'PLAYING'
					}
				});
				break;
			case 3:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `V0.1.0`,
						type: 'PLAYING'
					}
				});
				break;
			case 4:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `김밥봇의 문의/신고는 .지원서버`,
						type: 'PLAYING'
					}
				});
				break;
			case 5:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `.초대 로 김밥봇을 자신의 서버에 초대해보세요!`,
						type: 'PLAYING'
					}
				});
				break;
			case 6:
				client.user.setPresence({
					status: 'online',
					activity: {
						name: `.도움말`,
						type: 'PLAYING'
					}
				});
				break;
		}
	}, 10000);
	/*setInterval(() => {
    const axios = require('axios').default;
      axios.post(`https://api.koreanbots.dev/bots/servers`, {
          servers: client.guilds.cache.size
      }, {
          headers: {
              'Content-Type': "application/json",
              token: process.env.KTOKEN
          }
      });
  }, 200000);*/
});

const min = 50 - 20;
const stock = 50;

function float2int(value) {
	return value | 0;
}
setInterval(() => {
	const bab = client.dbstock.findOne({ _id: 'bab' });
	const kcoin = client.dbstock.findOne({ _id: 'kcoin' });
	const int = client.dbstock.findOne({ _id: 'int' });
	const js = client.dbstock.findOne({ _id: 'js' });
	const cd = client.dbstock.findOne({ _id: 'cd' });

	client.dbstock.findOneAndUpdate(
		{ _id: 'bab' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);

	client.dbstock.findOneAndUpdate(
		{ _id: 'cd' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);

	client.dbstock.findOneAndUpdate(
		{ _id: 'kraun' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);

	client.dbstock.findOneAndUpdate(
		{ _id: 'kcoin' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);

	client.dbstock.findOneAndUpdate(
		{ _id: 'int' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);

	client.dbstock.findOneAndUpdate(
		{ _id: 'js' },
		{ $set: { money: float2int(Math.random() * (min * -2) + min) + stock } }
	);
}, 300000);
/*
    Dokdo
*/
const Dokdo = require('dokdo');

const DokdoHandler = new Dokdo(client, {
	aliases: ['dokdo', 'dok'],
	prefix: '.',
	owners: client.dev
}); // Using Bot Application ownerID as default for owner option.

client.on('message', async message => {
	DokdoHandler.run(message); // try !dokdo
});

const keepAlive = require('./web');
keepAlive();
client.login(process.env.TOKEN);
