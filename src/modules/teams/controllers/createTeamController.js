const CreateTeamUseCase = require("../useCases/createTeamUseCase.js");

const createTeamUseCase = new CreateTeamUseCase();

class CreateTeamController {
  async handle(req, res) {
    try {
      const { body: teamData } = req;

      if (req.file) {
        teamData.flag = req.file.filename;
      }

      const requiredFields = ["name", "stadium"];
      const missingFields = requiredFields.filter(field => !teamData[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Os seguintes campos são obrigatórios:",
          missingFields,
        });
      }

      const hasTheTeamBeenRegistered = await createTeamUseCase.execute(teamData);

      if (typeof hasTheTeamBeenRegistered === "object") {
        return res.status(200).json({
          message: "Equipa cadastrada com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheTeamBeenRegistered,
          },
        });
      }
      return res.status(509).json({
        message: hasTheTeamBeenRegistered,
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

module.exports = CreateTeamController;
