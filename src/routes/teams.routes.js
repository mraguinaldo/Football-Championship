const { Router } = require("express");
const multer = require("multer");
const path = require("path")

const CreateTeamController = require("../modules/teams/controllers/createTeamController");
const UpdateTeamController = require("../modules/teams/controllers/updateTeamController");
const GetTeamController = require("../modules/teams/controllers/getTeamController");
const DeleteTeamController = require("../modules/teams/controllers/deleteTeamController");
const GetTeamsController = require("../modules/teams/controllers/getTeamsController");


const createTeamController = new CreateTeamController()
const updateTeamController = new UpdateTeamController()
const getTeamController = new GetTeamController()
const getTeamsController = new GetTeamsController()
const deleteTeamController = new DeleteTeamController()

const TeamRoutes = Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/flags");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

TeamRoutes.post('/create', upload.single("flag"), createTeamController.handle)
TeamRoutes.put('/edit/:teamId', upload.single("flag"), updateTeamController.handle)
TeamRoutes.get('/', getTeamController.handle)
TeamRoutes.get('/all', getTeamsController.handle)
TeamRoutes.delete('/:id', deleteTeamController.handle)

module.exports = TeamRoutes