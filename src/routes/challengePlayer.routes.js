const { Router } = require("express");

const UpdateChallengeController = require("../modules/challenges/controllers/updateChallengeController");
const GetChallengeController = require("../modules/challenges/controllers/getChallengeController");
const DeleteChallengeController = require("../modules/challenges/controllers/deleteChallengeController");
const CreateChallengePlayerController = require("../modules/challengePlayers/controllers/createChallengePlayerController");


const createChallengePlayerController = new CreateChallengePlayerController()
const updateChallengeController = new UpdateChallengeController()
const getChallengeController = new GetChallengeController()
const deleteChallengeController = new DeleteChallengeController()

const ChallengePlayerRoutes = Router()

ChallengePlayerRoutes.post('/create', createChallengePlayerController.handle)
ChallengePlayerRoutes.put('/edit/:challengeId', updateChallengeController.handle)
ChallengePlayerRoutes.get('/', getChallengeController.handle)
ChallengePlayerRoutes.delete('/:id', deleteChallengeController.handle)

module.exports = ChallengePlayerRoutes