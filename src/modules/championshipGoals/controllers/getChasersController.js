
const GetChasersUseCase = require("../useCases/getChasersUseCase");

const getChasersUseCase = new GetChasersUseCase();

class GetChasersController {
  async handle(req, res) {
    try {

      const hasThePlayerBeenFound = await getChasersUseCase.execute();

      if (typeof hasThePlayerBeenFound === "object") {
        return res.status(200).json({
          message: "Goleadores encontrados",
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

module.exports = GetChasersController;
