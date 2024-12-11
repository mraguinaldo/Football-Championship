const { Router } = require("express");
const CreateChallengeController = require("../modules/challenges/controllers/createChallengeController");
const UpdateChallengeController = require("../modules/challenges/controllers/updateChallengeController");
const GetChallengeController = require("../modules/challenges/controllers/getChallengeController");
const DeleteChallengeController = require("../modules/challenges/controllers/deleteChallengeController");
const GetChallengeByTeamIdController = require("../modules/challenges/controllers/getChallengeByTeamIdController");
const GetChallengeByStatusController = require("../modules/challenges/controllers/getChallengeByStatusController");
const UpdateChallengeStatusController = require("../modules/challenges/controllers/updateChallengeStatusController");


const createChallengeController = new CreateChallengeController()
const updateChallengeController = new UpdateChallengeController()
const getChallengeController = new GetChallengeController()
const getChallengeByStatusController = new GetChallengeByStatusController()
const getChallengeByTeamIdController = new GetChallengeByTeamIdController()
const deleteChallengeController = new DeleteChallengeController()
const updateChallengeStatusController = new UpdateChallengeStatusController()

const ChallengeRoutes = Router()

ChallengeRoutes.post('/create', createChallengeController.handle)
ChallengeRoutes.put('/edit/:challengeId', updateChallengeController.handle)
ChallengeRoutes.put('/edit', updateChallengeStatusController.handle)
ChallengeRoutes.get('/', getChallengeController.handle)
ChallengeRoutes.get('/challenges', getChallengeByStatusController.handle)
ChallengeRoutes.get('/:teamId', getChallengeByTeamIdController.handle)
ChallengeRoutes.delete('/:id', deleteChallengeController.handle)

module.exports = ChallengeRoutes