const DeletePlayerUseCase = require("../useCases/deletePlayerUseCase.js");

const deletePlayerUseCase = new DeletePlayerUseCase();

class DeletePlayerController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const hasThePlayerBeenRemoved = await deletePlayerUseCase.execute(id);

      if (typeof hasThePlayerBeenRemoved === "object") {
        return res.status(200).json({
          message: "Jogador eliminado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasThePlayerBeenRemoved,
          },
        });
      }
      return res.status(404).json({
        message: hasThePlayerBeenRemoved,
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

module.exports = DeletePlayerController;
