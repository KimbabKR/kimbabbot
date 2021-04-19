module.exports = {
    route: "/",
    method: "get",
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    async router(req, res) {
        res.render('index');
    }
}