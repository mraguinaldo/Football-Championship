const { Router } = require("express");
const CreatePlayerController = require("../modules/players/controllers/createPlayerController");
const UpdatePlayerController = require("../modules/players/controllers/updatePlayerController");
const GetPlayerController = require("../modules/players/controllers/getPlayerController");
const DeletePlayerController = require("../modules/players/controllers/deletePlayerController");


const createPlayerController = new CreatePlayerController()
const updatePlayerController = new UpdatePlayerController()
const getPlayerController = new GetPlayerController()
const deletePlayerController = new DeletePlayerController()

const PlayersRoutes = Router()

PlayersRoutes.post('/create', createPlayerController.handle)
PlayersRoutes.put('/edit/:playerId', updatePlayerController.handle)
PlayersRoutes.get('/', getPlayerController.handle)
PlayersRoutes.delete('/:id', deletePlayerController.handle)

module.exports = PlayersRoutes