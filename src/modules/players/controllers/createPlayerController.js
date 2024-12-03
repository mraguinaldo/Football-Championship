const CreatePlayerUseCase = require("../useCases/createPlayerUseCase");

const createPlayerUseCase = new CreatePlayerUseCase();

class CreatePlayerController {
  async handle(req, res) {
    try {
      const { body: player } = req;

      const requiredFields = ["name", "shirt_number", "position", "age", "weight", "team_id"];
      const positions = ["goalkeeper", "defender", "midfielder", "forward"];

      const missingFields = requiredFields.filter(field => !player[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Os seguintes campos são obrigatórios:",
          missingFields,
        });
      }

      if (player.position !== 'goalkeeper' && player.position !== 'defender' && player.position !== 'midfielder' && player.position !== 'forward') {
        return res.status(400).json({
          message: "Apenas essas posições devem ser cadastradas",
          positions,
        });
      }

      const hasThePlayerBeenRegistered = await createPlayerUseCase.execute(player);

      if (typeof hasThePlayerBeenRegistered === "object") {
        return res.status(200).json({
          message: "Jogador cadastrado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasThePlayerBeenRegistered,
          },
        });
      }
      return res.status(500).json({
        message: hasThePlayerBeenRegistered,
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

module.exports = CreatePlayerController;
