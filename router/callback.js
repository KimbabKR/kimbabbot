const DiscordOauth2 = require("discord-oauth2"),
dotenv = require("dotenv"),
fetch = require("node-fetch");

dotenv.config();


module.exports = {
    route: "/callback",
    method: "get",
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    async router(req, res) {
        const { code } = req.query;
        console.log("Done!");
        var oauth = new DiscordOauth2({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: process.env.REDIRECT_URI,
        });

        oauth.tokenRequest({
            code: code,
            scope: "identify",
            grantType: "authorization_code",
        }).then(discordOauth_res => {
            fetch(`${"https://discord.com/api/v8/"}/users/@me`, {
                headers: {
                    Authorization: `${discordOauth_res.token_type} ${discordOauth_res.access_token}`,
                },
            }).then(userRes => {
                return userRes.json();
            }).then(json => {
                res.json(json);
                console.log(json);
            })
        });
    }
}
