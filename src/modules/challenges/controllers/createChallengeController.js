const CreateChallengeUseCase = require("../useCases/createChallengeUseCase");

const createChallengeUseCase = new CreateChallengeUseCase();

class CreateChallengeController {
  async handle(req, res) {
    try {
      const { body: challenge } = req;

      const requiredFields = ["visiting_team", "home_team", "time_the_game_will_take"];
      const missingFields = requiredFields.filter(field => !challenge[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Os seguintes campos são obrigatórios:",
          missingFields,
        });
      }

      const hasTheChallengeBeenRegistered = await createChallengeUseCase.execute(challenge);

      if (typeof hasTheChallengeBeenRegistered === "object") {
        return res.status(200).json({
          message: "Desafio criado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheChallengeBeenRegistered,
          },
        });
      }
      return res.status(500).json({
        message: hasTheChallengeBeenRegistered,
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

module.exports = CreateChallengeController;
