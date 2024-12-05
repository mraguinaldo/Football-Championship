const DeleteChampionshipGoalsUseCase = require("../useCases/deleteChampionshipGoalsUseCase.js");

const deleteChampionshipGoalsUseCase = new DeleteChampionshipGoalsUseCase();

class DeleteChampionshipGoalsController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const hasTheChampionshipGoalsBeenRemoved = await deleteChampionshipGoalsUseCase.execute(id);

      if (typeof hasTheChampionshipGoalsBeenRemoved === "object") {
        return res.status(200).json({
          message: "Golo eliminado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheChampionshipGoalsBeenRemoved,
          },
        });
      }
      return res.status(404).json({
        message: hasTheChampionshipGoalsBeenRemoved,
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

module.exports = DeleteChampionshipGoalsController;
