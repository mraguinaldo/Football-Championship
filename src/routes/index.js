const { Router } = require("express");
const TeamRoutes = require("./teams.routes");
const PlayersRoutes = require("./players.routes");

const routes = Router()

routes.use('/team', TeamRoutes)
routes.use('/player', PlayersRoutes)

module.exports = routes