module.exports = {
    name: 'K-BOTS',
    aliases: ['hellothisisverification', '개발자'],
    description: 'Hello This is Verification',
    usage: '.hellothisisverification',
    run: async (client, message, args, config) => {
        message.channel.send(`주.. 주인님 어디갔지? 우리 주인님을 찾아주세요 ㅜㅜ. ${client.users.cache.get('552103947662524416').tag}(552103947662524416))`);
    }
}