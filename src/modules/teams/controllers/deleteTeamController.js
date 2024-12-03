const DeleteTeamUseCase = require("../useCases/DeleteTeamUseCase.js");

const deleteTeamUseCase = new DeleteTeamUseCase();

class DeleteTeamController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const hasTheTeamBeenRemoved = await deleteTeamUseCase.execute(id);

      if (typeof hasTheTeamBeenRemoved === "object") {
        return res.status(200).json({
          message: "Equipa eliminada com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheTeamBeenRemoved,
          },
        });
      }
      return res.status(404).json({
        message: hasTheTeamBeenRemoved,
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

module.exports = DeleteTeamController;
