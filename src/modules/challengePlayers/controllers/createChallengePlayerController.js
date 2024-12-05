const CreateChallengePlayerUseCase = require("../useCases/createChallengePlayerUseCase");

const createChallengePlayerUseCase = new CreateChallengePlayerUseCase();

class CreateChallengePlayerController {
  async handle(req, res) {
    try {
      const { players } = req.body;
      const { challengeId, team_type } = req.query;

      if (!challengeId) {
        return res.status(400).json({
          status: {
            success: false,
          },
          message: "Insira o id da para a partida",
        });
      }

      const teamTypes = ["home", "visitor"];

      if (team_type !== 'home' && team_type !== 'visitor' || team_type === '') {
        return res.status(400).json({
          status: {
            success: false,
          },
          message: "O team_type só aceitas esses valores",
          teamTypes,
        });
      }


      if (!players) {
        return res.status(400).json({
          message: "Insira os jogadores para a partida",
          status: {
            success: false,
          }
        });
      }

      const hasThePlayersBeenRegistered = await createChallengePlayerUseCase.execute({ challengeId, team_type, players });

      if (typeof hasThePlayersBeenRegistered === "object") {
        return res.status(200).json({
          message: "Jogadores cadastrado com sucesso",
          status: {
            success: true,
          },
          response: {
            data: hasThePlayersBeenRegistered,
          },
        });
      }
      return res.status(500).json({
        message: hasThePlayersBeenRegistered,
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

module.exports = CreateChallengePlayerController;
