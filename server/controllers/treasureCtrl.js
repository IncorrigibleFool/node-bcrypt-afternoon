module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        const treasure = await db.get_dragon_treasure(1)
        res.send(treasure)
    },

    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const treasure = await db.get_user_treasure(req.session.user.id)
        res.send(treasure)
    }
}