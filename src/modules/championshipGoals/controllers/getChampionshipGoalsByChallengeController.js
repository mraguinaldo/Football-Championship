const GetChampionshipGoalsByChallengeUseCase = require("../useCases/getChampionshipGoalsByChallengeUseCase");

const getChampionshipGoalsByChallengeUseCase = new GetChampionshipGoalsByChallengeUseCase();

class GetChampionshipGoalsByChallengeController {
  async handle(req, res) {
    try {
      const { playerId } = req.query;
      const { challengeId } = req.params;

      const hasThePlayerBeenFound = await getChampionshipGoalsByChallengeUseCase.execute(playerId, challengeId);

      if (typeof hasThePlayerBeenFound === "object") {
        return res.status(200).json({
          message: "Golos encontrados com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasThePlayerBeenFound,
          },
        });
      }
      return res.status(404).json({
        message: hasThePlayerBeenFound,
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

module.exports = GetChampionshipGoalsByChallengeController;
