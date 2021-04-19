const dotenv = require('dotenv'),
fetch = require('node-fetch'),
MongoDB = require('mongodb');



dotenv.config();
var db = {};
const DBClient = new MongoDB.MongoClient(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
DBClient.connect().then(() => {
    db.user = DBClient.db('bot').collection('user');
    db.item = DBClient.db('bot').collection('stock');
});


module.exports = {
    route: "/api/give_item",
    method: "post",
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    async router(req, res) {
        const { bot_token } = req.headers;
        const { token_type, access_token, item_id } = req.body;

        if (!bot_token || !token_type || !access_token) {
            return res.status(402).json({
                success: false,
                error: "Missing token",
            });
        }
        if (!item_id) {
            return res.status(404).json({
                success: false,
                error: "Missing item_id",
            });
        }

        try {
            let discordAPiRes = await fetch(`${"https://discord.com/api/v8"}/users/@me`, {
                headers: {
                    Authorization: `Bot ${bot_token}`,
                },
            });
            discordAPiRes = await discordAPiRes.json()
            if (discordAPiRes.message) {
                throw new Error(`${discordAPiRes.message}\u200b`);
            }

            if (discordAPiRes.bot) {
                let discordUserRes = await fetch(`${"https://discord.com/api/v8"}/users/@me`, {
                    headers: {
                        Authorization: `${token_type} ${bot_token}`,
                    },
                });
                discordUserRes = await discordUserRes.json();
                if (discordUserRes.message) {
                    throw new Error(`${discordAPiRes.message}\u200b`);
                } else {
                    const { id } = discordUserRes;
                    let userDB = await db.user.findOne({_id: id});
                    if (userDB) {
                        if (userDB.ban) {
                            throw new Error(`This User banned from UniT System`);
                        }
                        let itemDB = await db.item.findOne({_id: item_id});
                        if (itemDB) {
                            let total = userDB.unit + itemDB.price;
                            if (total < 0) {
                                throw new Error(`There is no money`);
                            }
                            if (itemDB.count <= 0) {
                                throw new Error(`Sold out`);
                            }
                            db.user.findOneAndUpdate({_id: id}, {
                                $push: {
                                    inventory: item_id,
                                },
                                $set: {
                                    unit: total,
                                }
                            });
                            db.item.findOneAndUpdate({_id: id}, {
                                $set: {
                                    count: itemDB.count - 1,
                                }
                            });

                            return res.status(200).json({
                                success: true,
                                item_price: itemDB.price,
                                totla_user_unit: total,
                            });
                        } else {
                            throw new Error(`Item Not Found :(`);
                        }
                    } else {
                        throw new Error('User Not found');
                    }
                }
            } else {
                throw new Error(`Not a bot token!\u200b`);
            }
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.toString(),
            });
        }
        
        // fetch(`${"https://discord.com/api/v8"}/users/@me`, {
        //     headers: {
        //         Authorization: `Bot ${bot_token}`,
        //     },
        // }).then(userRes => {
        //     return userRes.json();
        // }).then(async json => {
        //     const { bot } = json;
        //     if (json) {

        //     } else {

        //     }
        //     // const { id, username } = json;
        //     // if (!id || !username) {
        //     //     return res.json({
        //     //         success: false,
        //     //         error: 'discord api error :('
        //     //     })
        //     // }

        //     // let userDB = await db.user.findOne({_id: id});
        //     // if (userDB) {
        //     //     if (userDB.ban) {
        //     //         return res.status(400).json({
        //     //             success: false,
        //     //             error: `This user is a baned user.`,
        //     //         });
        //     //     }
        //     //     let itemDB = await db.item.findOne({_id: item_id});
        //     //     if (itemDB) {
        //     //         db.user.findOneAndUpdate({_id: id}, {
        //     //             $push: {
        //     //                 inventory: item_id,
        //     //             },
        //     //         });
        //     //     } else {
        //     //         return res.status(404).json({
        //     //             success: false,
        //     //             error: `Item Not found`,
        //     //         });
        //     //     }
        //     // } else {
        //     //     return res.status(404).json({
        //     //         success: false,
        //     //         error: `User Not found`,
        //     //     });
        //     // }   
        // }).catch(e => {
        //     console.log(e);
        //     return res.status(400).json({
        //         success: false,
        //         error: e.toString(),
        //     });
        // })
    }
}