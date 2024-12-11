const { Router } = require("express");

const CreateChampionshipGoalsController = require("../modules/championshipGoals/controllers/createChampionshipGoalsController");
const UpdateChampionshipGoalsController = require("../modules/championshipGoals/controllers/updateChampionshipGoalsController");
const DeleteChampionshipGoalsController = require("../modules/championshipGoals/controllers/deleteChampionshipGoalsController");
const GetChampionshipGoalsController = require("../modules/championshipGoals/controllers/getChampionshipGoalsController");
const GetChampionshipGoalsByChallengeController = require("../modules/championshipGoals/controllers/getChampionshipGoalsByChallengeController");
const GetChasersController = require("../modules/championshipGoals/controllers/getChasersController");

const createChampionshipGoalsController = new CreateChampionshipGoalsController()
const getChasersController = new GetChasersController()
const updateChampionshipGoalsController = new UpdateChampionshipGoalsController()
const getChampionshipGoalsController = new GetChampionshipGoalsController()
const getChampionshipGoalsByChallengeController = new GetChampionshipGoalsByChallengeController()
const deleteChampionshipGoalsController = new DeleteChampionshipGoalsController()

const championshipGoalsRoutes = Router()

championshipGoalsRoutes.post('/create', createChampionshipGoalsController.handle)
championshipGoalsRoutes.put('/', updateChampionshipGoalsController.handle)
championshipGoalsRoutes.get('/', getChampionshipGoalsController.handle)
championshipGoalsRoutes.get('/chasers', getChasersController.handle)
championshipGoalsRoutes.get('/:challengeId', getChampionshipGoalsByChallengeController.handle)
championshipGoalsRoutes.delete('/:id', deleteChampionshipGoalsController.handle)

module.exports = championshipGoalsRoutes