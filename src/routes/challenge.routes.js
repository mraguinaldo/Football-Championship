const { Router } = require("express");
const CreateChallengeController = require("../modules/challenges/controllers/createChallengeController");
const UpdateChallengeController = require("../modules/challenges/controllers/updateChallengeController");
const GetChallengeController = require("../modules/challenges/controllers/getChallengeController");
const DeleteChallengeController = require("../modules/challenges/controllers/deleteChallengeController");


const createChallengeController = new CreateChallengeController()
const updateChallengeController = new UpdateChallengeController()
const getChallengeController = new GetChallengeController()
const deleteChallengeController = new DeleteChallengeController()

const ChallengeRoutes = Router()

ChallengeRoutes.post('/create', createChallengeController.handle)
ChallengeRoutes.put('/edit/:challengeId', updateChallengeController.handle)
ChallengeRoutes.get('/', getChallengeController.handle)
ChallengeRoutes.delete('/:id', deleteChallengeController.handle)

module.exports = ChallengeRoutes