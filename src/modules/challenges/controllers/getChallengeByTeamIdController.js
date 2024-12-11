const GetChallengeByTeamIdUseCase = require("../useCases/getChallengeByTeamIdUseCase");

const getChallengeByTeamIdUseCase = new GetChallengeByTeamIdUseCase();

class GetChallengeByTeamIdController {
  async handle(req, res) {
    try {
      const { teamId } = req.params;

      if (!teamId) {
        return res.status(400).json({
          message: "O id da equipa é obrigatório",
        });
      }

      const hasTheChallengeBeenFound = await getChallengeByTeamIdUseCase.execute(teamId);

      if (typeof hasTheChallengeBeenFound === "object") {
        return res.status(200).json({
          message: "Desafios encontrados com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheChallengeBeenFound,
          },
        });
      }
      return res.status(404).json({
        message: hasTheChallengeBeenFound,
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

module.exports = GetChallengeByTeamIdController;
