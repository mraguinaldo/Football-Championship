const UpdateTeamUseCase = require("../useCases/updateTeamUseCase.js");

const updateTeamUseCase = new UpdateTeamUseCase();

class UpdateTeamController {
  async handle(req, res) {
    try {
      const { teamId } = req.params;
      const { body: teamData } = req;

      if (req.file) {
        teamData.flag = req.file.filename;
      }

      const theTeamHasBeenUpdated = await updateTeamUseCase.execute({ teamId, teamData });

      if (typeof theTeamHasBeenUpdated === "object") {
        return res.status(200).json({
          message: "Equipa editada com sucesso",
          status: {
            success: true,
          },
          response: {
            data: theTeamHasBeenUpdated,
          },
        });
      }
      return res.status(404).json({
        message: theTeamHasBeenUpdated,
        status: {
          success: false,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
        error: error.message,
      });
    }
  }
}

module.exports = UpdateTeamController;
