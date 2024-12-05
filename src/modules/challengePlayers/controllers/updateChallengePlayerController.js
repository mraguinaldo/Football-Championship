const UpdatePlayerUseCase = require("../useCases/updatePlayerUseCase.js");

const updatePlayerUseCase = new UpdatePlayerUseCase();

class UpdateChallengePlayerController {
  async handle(req, res) {
    try {
      const { playerId } = req.params;
      const { body: player } = req;
      const positions = ["goalkeeper", "defender", "midfielder", "forward"];

      if (player.position !== 'goalkeeper' && player.position !== 'defender' && player.position !== 'midfielder' && player.position !== 'forward') {
        return res.status(400).json({
          message: "Apenas essas posições devem ser cadastradas",
          positions,
        });
      }

      const thePlayerHasBeenUpdated = await updatePlayerUseCase.execute({ playerId, player });

      if (typeof thePlayerHasBeenUpdated === "object") {
        return res.status(200).json({
          message: "Jogador editado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: thePlayerHasBeenUpdated,
          },
        });
      }
      return res.status(404).json({
        message: thePlayerHasBeenUpdated,
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

module.exports = UpdateChallengePlayerController;
