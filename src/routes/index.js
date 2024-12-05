const { Router } = require("express");
const TeamRoutes = require("./teams.routes");
const PlayersRoutes = require("./players.routes");
const ChallengeRoutes = require("./challenge.routes");
const ChallengePlayerRoutes = require("./challengePlayer.routes");
const championshipGoalsRoutes = require("./championshipGoals.routes");

const routes = Router()

routes.use('/team', TeamRoutes)
routes.use('/player', PlayersRoutes)
routes.use('/challenge', ChallengeRoutes)
routes.use('/challengePlayer', ChallengePlayerRoutes)
routes.use('/championshipGoals', championshipGoalsRoutes)

module.exports = routes