const { Router } = require("express");

const GetTeamController = require("../modules/teams/controllers/getTeamController");

const CreateChampionshipGoalsController = require("../modules/championshipGoals/controllers/createChampionshipGoalsController");
const UpdateChampionshipGoalsController = require("../modules/championshipGoals/controllers/updateChampionshipGoalsController");
const DeleteChampionshipGoalsController = require("../modules/championshipGoals/controllers/deleteChampionshipGoalsController");

const createChampionshipGoalsController = new CreateChampionshipGoalsController()
const updateChampionshipGoalsController = new UpdateChampionshipGoalsController()
const getTeamController = new GetTeamController()
const deleteChampionshipGoalsController = new DeleteChampionshipGoalsController()

const championshipGoalsRoutes = Router()

championshipGoalsRoutes.post('/create', createChampionshipGoalsController.handle)
championshipGoalsRoutes.put('/', updateChampionshipGoalsController.handle)
championshipGoalsRoutes.get('/', getTeamController.handle)
championshipGoalsRoutes.delete('/:id', deleteChampionshipGoalsController.handle)

module.exports = championshipGoalsRoutes