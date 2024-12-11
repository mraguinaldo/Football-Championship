const UpdateChallengeStatusUseCase = require("../useCases/updateChallengeStatusUseCase");

const updateChallengeStatusUseCase = new UpdateChallengeStatusUseCase();

class UpdateChallengeStatusController {
  async handle(req, res) {
    try {
      const { challengeId, gameStatus } = req.query;

      const GAME_STATUS = ["pending", "canceled", "occurred", "finished"];
      if (gameStatus) {
        if (gameStatus !== 'pending' && gameStatus !== 'finished' && gameStatus !== 'canceled' && gameStatus !== 'occurred') {
          return res.status(400).json({
            message: "Apenas esses estados devem ser cadastradas",
            GAME_STATUS,
          });
        }
      }

      const theChallengeHasBeenUpdated = await updateChallengeStatusUseCase.execute({ challengeId, gameStatus });

      if (typeof theChallengeHasBeenUpdated === "object") {
        return res.status(200).json({
          message: "Desafio editado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: theChallengeHasBeenUpdated,
          },
        });
      }
      return res.status(404).json({
        message: theChallengeHasBeenUpdated,
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

module.exports = UpdateChallengeStatusController;
