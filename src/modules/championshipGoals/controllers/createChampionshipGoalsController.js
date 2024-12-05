const CreateChampionshipGoalsUseCase = require("../useCases/createChampionshipGoalsUseCase");

const createChampionshipGoalsUseCase = new CreateChampionshipGoalsUseCase();

class CreateChampionshipGoalsController {
  async handle(req, res) {
    try {
      const championshipGoals = req.body;

      const requiredFields = ["player_id", "time_the_goal_was_scored", "challenge_id", "type_goal"];

      const typesGoal = ["head", "penalty", "feet"]

      const missingFields = requiredFields.filter(field => !championshipGoals[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Os seguintes campos são obrigatórios:",
          missingFields,
        });
      }

      if (championshipGoals.type_goal !== 'head' && championshipGoals.type_goal !== 'penalty' && championshipGoals.type_goal !== 'feet') {
        return res.status(400).json({
          message: "Apenas esses tipos de golos devem ser cadastrados",
          typesGoal,
        });
      }

      const hasTheChampionshipGoalsBeenRegistered = await createChampionshipGoalsUseCase.execute({ championshipGoals });

      if (typeof hasTheChampionshipGoalsBeenRegistered === "object") {
        return res.status(200).json({
          message: "Golo cadastrado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasTheChampionshipGoalsBeenRegistered,
          },
        });
      }
      return res.status(500).json({
        message: hasTheChampionshipGoalsBeenRegistered,
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

module.exports = CreateChampionshipGoalsController;
