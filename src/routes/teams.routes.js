const { Router } = require("express");
const CreateTeamController = require("../modules/teams/controllers/createTeamController");
const UpdateTeamController = require("../modules/teams/controllers/updateTeamController");
const GetTeamController = require("../modules/teams/controllers/getTeamController");
const DeleteTeamController = require("../modules/teams/controllers/deleteTeamController");

const createTeamController = new CreateTeamController()
const updateTeamController = new UpdateTeamController()
const getTeamController = new GetTeamController()
const deleteTeamController = new DeleteTeamController()

const TeamRoutes = Router()

TeamRoutes.post('/create', createTeamController.handle)
TeamRoutes.put('/edit/:teamId', updateTeamController.handle)
TeamRoutes.get('/', getTeamController.handle)
TeamRoutes.delete('/:id', deleteTeamController.handle)

module.exports = TeamRoutes