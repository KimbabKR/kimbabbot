const { Client, Message, MessageEmbed } = require("discord.js");

const commandsTitle = [
    "도움말ㅣ기본 명령어",
    "도움말ㅣ돈",
    "도움말ㅣ개발자 전용 명령어"
]
const commandsList = [
    [
        {
            name: `.도움말`,
            value: `당신이 보고 있는 이 페이지입니다!`,
        },
        {
            name: `.핑`,
            value: `봇 지연시간을 측정합니다.`,
        },
        {
            name: `.이유`,
            value: `밴이 되었을때, 이유를 확인합니다.`,
        },
        {
            name: `.리더보드 (숫자)`,
            value: `돈 순위를 보여줍니다.`,
        },
        {
            name: `.초대링크`,
            value: `김밥봇 관련된 링크들을 알려드립니다.`,
        },
    ],
    [
        {
            name: `.가입`,
            value: `김밥봇의 첫 걸음이죠.`,
        },
        {
            name: `.탈퇴`,
            value: `김밥봇 서비스에서 털퇴합니다.`,
        },
        {
            name: `.출첵`,
            value: `출석 체크입니다!`,
        },
        {
            name: `.지갑 (멘션 or ID)`,
            value: `자신의 또는 다른유저의 돈을 확인합니다`,
        },
        {
            name: `.가방`,
            value: `뒤적뒤적 보유 아이템을 보여줘요.`,
        },
        {
            name: `.상점`,
            value: `보유중인 돈을 사용해 아이템을 살수 있습니다.`,
        },
        
    ],
    [
        {
            name: `.지급 [유저] [수량]`,
            value: `유저에게 돈을 설정한 개수만큼 지급합니다. **개발자 전용 명령어 입니다.`,
        },
        {
            name: `.제거 [유저] [수량]`,
            value: `유저에게 돈을 설정한 개수만큼 제거합니다. **개발자 전용 명령어 입니다.`,
        },
        {
            name: `.초기화 [유저]`,
            value: `유저의 돈을 초기화합니다. **개발자 전용 명령어 입니다.`,
        },
        {
            name: `.밴 [유저]`,
            value: `김밥봇 이용을 할수 없게 만듭니다. **개발자 전용 명령어 입니다.`,
        },
        {
            name: `.인벤토리제거 [아이템ID]`,
            value: `지급한 아이템을 인벤토리에서 제거합니다. **개발자 전용 명령어 입니다.`,
        },
        {
             name: `.dok`,
             value: `독도 모듈을 사용해 Eval, Shell 을 접속이 가능합니다`,
        },
        
    ],
    // [
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    // ],
    // [
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    // ],
    // [
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    //     {
    //         name: ``,
    //         value: ``,
    //     },
    // ],
]

module.exports = {
    name: '도움말',
    aliases: ['도움말', '도움', 'help', 'ehdna', 'ehdnaakf', 'ㅗ디ㅔ'],
    description: 'Hello This is Verification',
    usage: '.도움말',
    run: async (client, message, args, config) => {
            let page = 1, pageMax = commandsList.length;
            let embedJSON = {
                title: "도움말",
                description: "**김밥봇은 :heart: 와 NodeJS 로 개발되었습니다**\n접두사는 `.` 입니다\n아직 명령어들은 작동하지 않을수 있습니다.",
                color: "#FFFFF",
                timestamp: new Date()
            }
            let commandsDescription = [""]
            embedJSON.title = commandsTitle[page - 1];

            embedJSON.fields = commandsList[page - 1];
        
            let pageMessage = await message.channel.send({embed: embedJSON});
            pageMessage.react(`⬅`).then(() => pageMessage.react('➡'));

            const backwardReactFilter = (reaction, user) => reaction.emoji.name == "⬅" && user.id === message.author.id;
            const forwardReactFilter = (reaction, user) => reaction.emoji.name == "➡" && user.id === message.author.id;

            const forward = pageMessage.createReactionCollector(forwardReactFilter, {tiem: 60000});
            const backward = pageMessage.createReactionCollector(backwardReactFilter, {tiem: 60000});

            forward.on('collect', async (r, err) => {
                //r.users.remove(message.author.id);
                if (page == pageMax) return;
                page += 1;
                embedJSON.description = commandsDescription[page - 1]
                embedJSON.title = commandsTitle[page - 1];
                embedJSON.fields = commandsList[page - 1];
                pageMessage.edit({embed: embedJSON});
            });

            backward.on('collect', async (r, e) => {
                //r.users.remove(message.author.id);
                if (page == 1) return;
                page -= 1;
                embedJSON.title = commandsTitle[page - 1];
                embedJSON.fields = commandsList[page - 1];
                pageMessage.edit({embed: embedJSON});
            });
        }
}