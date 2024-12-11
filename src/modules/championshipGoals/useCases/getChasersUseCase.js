const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository")
const GetPlayerUseCase = require("../../players/useCases/getPlayerUseCase");

const championshipGoalsRepository = new ChampionshipGoalsRepository()
const getPlayerUseCase = new GetPlayerUseCase()

class GetChasersUseCase {
  async execute() {
    const playersFound = await championshipGoalsRepository.getChasers();
    const playersDetails = await Promise.all(
      playersFound.map(async (player) => {
        try {
          const Player = await getPlayerUseCase.execute(player.id);
          return { Player };
        } catch (err) {
          console.error(
            `Erro ao buscar dados do jogador com ID ${player.id}: ${err.message}`
          );
          return { ...player, goals: null };
        }
      })
    );

    return {
      players: playersDetails,
    };
  }
}



module.exports = GetChasersUseCase