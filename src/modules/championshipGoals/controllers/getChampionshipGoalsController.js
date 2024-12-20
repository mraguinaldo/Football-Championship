const GetChampionshipGoalsUseCase = require("../useCases/getChampionshipGoalsUseCase");

const getChampionshipGoalsUseCase = new GetChampionshipGoalsUseCase();

class GetChampionshipGoalsController {
  async handle(req, res) {
    try {
      const { playerId } = req.query;

      const hasThePlayerBeenFound = await getChampionshipGoalsUseCase.execute(playerId);

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

module.exports = GetChampionshipGoalsController;
