const UpdateChallengeUseCase = require("../useCases/updateChallengeUseCase");

const updateChallengeUseCase = new UpdateChallengeUseCase();

class UpdateChallengeController {
  async handle(req, res) {
    try {
      const { challengeId } = req.params;
      const { body: challenge } = req;
      const gameStatus = ["pending", "canceled", "occurred"];
      if (challenge.game_status) {
        if (challenge.game_status !== 'pending' && challenge.game_status !== 'canceled' && challenge.game_status !== 'occurred') {
          return res.status(400).json({
            message: "Apenas esses estados devem ser cadastradas",
            gameStatus,
          });
        }
      }

      const theChallengeHasBeenUpdated = await updateChallengeUseCase.execute({ challengeId, challenge });

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

module.exports = UpdateChallengeController;
