const GetChallengeUseCase = require("../useCases/getChallengeUseCase");

const getChallengeUseCase = new GetChallengeUseCase();

class GetChallengeController {
  async handle(req, res) {
    try {
      const { challengeId } = req.query;

      if (!challengeId) {
        return res.status(400).json({
          message: "O challengeId é obrigatório",
        });
      }

      const hasTheChallengeBeenFound = await getChallengeUseCase.execute(challengeId);

      if (typeof hasTheChallengeBeenFound === "object") {
        return res.status(200).json({
          message: "Desafio encontrado com sucesso",
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

module.exports = GetChallengeController;
