const GetChallengesByStatusUseCase = require("../useCases/getChallengesByStatusUseCase");

const getChallengesByStatusUseCase = new GetChallengesByStatusUseCase();

class GetChallengeByStatusController {
  async handle(req, res) {
    try {
      const { challenge_status } = req.query;

      const hasTheChallengeBeenFound = await getChallengesByStatusUseCase.execute({ challenge_status });

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

module.exports = GetChallengeByStatusController;
