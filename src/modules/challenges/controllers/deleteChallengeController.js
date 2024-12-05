const DeleteChallengeUseCase = require("../useCases/deleteChallengeUseCase");

const deleteChallengeUseCase = new DeleteChallengeUseCase();

class DeleteChallengeController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const hasTheChallengeBeenRemoved = await deleteChallengeUseCase.execute(id);

      if (typeof hasTheChallengeBeenRemoved === "object") {
        return res.status(200).json({
          message: "Desafio eliminado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheChallengeBeenRemoved,
          },
        });
      }
      return res.status(404).json({
        message: hasTheChallengeBeenRemoved,
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

module.exports = DeleteChallengeController;
