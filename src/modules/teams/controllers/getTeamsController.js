const GetTeamsUseCase = require("../useCases/getTeamsUseCase.js");

const getTeamsUseCase = new GetTeamsUseCase();

class GetTeamsController {
  async handle(req, res) {
    try {
      const hasTheTeamsBeenFound = await getTeamsUseCase.execute();

      if (typeof hasTheTeamsBeenFound === "object") {
        return res.status(200).json({
          message: "Equipas encontradas com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheTeamsBeenFound,
          },
        });
      }
      return res.status(404).json({
        message: hasTheTeamsBeenFound,
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

module.exports = GetTeamsController;
