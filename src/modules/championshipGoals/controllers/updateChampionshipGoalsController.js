const UpdateChampionshipGoalsUseCase = require("../useCases/updateChampionshipGoalsUseCase.js");

const updateChampionshipGoalsUseCase = new UpdateChampionshipGoalsUseCase();

class UpdateChampionshipGoalsController {
  async handle(req, res) {
    try {
      const { playerId, challengeId, championshipGoalId } = req.query;
      const championshipGoals = req.body;

      const typesGoal = ["head", "penalty", "feet"]

      if (championshipGoals.type_goal) {
        if (championshipGoals.type_goal !== 'head' && championshipGoals.type_goal !== 'penalty' && championshipGoals.type_goal !== 'feet') {
          return res.status(400).json({
            message: "Apenas esses tipos de golos devem ser cadastrados",
            typesGoal,
          });
        }
      }

      const theChampionshipGoalHasBeenUpdated = await updateChampionshipGoalsUseCase.execute({ playerId, championshipGoalId, championshipGoals, challengeId });

      if (typeof theChampionshipGoalHasBeenUpdated === "object") {
        return res.status(200).json({
          message: "Golo editado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: theChampionshipGoalHasBeenUpdated,
          },
        });
      }
      return res.status(404).json({
        message: theChampionshipGoalHasBeenUpdated,
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

module.exports = UpdateChampionshipGoalsController;
