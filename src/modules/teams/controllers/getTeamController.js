const GetTeamUseCase = require("../useCases/getTeamUseCase.js");

const getTeamUseCase = new GetTeamUseCase();

class GetTeamController {
  async handle(req, res) {
    try {
      const { teamId } = req.query;

      const hasTheTeamBeenFound = await getTeamUseCase.execute(teamId);

      if (typeof hasTheTeamBeenFound === "object") {
        return res.status(200).json({
          message: "Equipa encontrada com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheTeamBeenFound,
          },
        });
      }
      return res.status(404).json({
        message: hasTheTeamBeenFound,
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

module.exports = GetTeamController;
