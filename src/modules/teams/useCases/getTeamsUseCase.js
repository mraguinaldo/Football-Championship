const PlayerRepository = require("../../../repositories/PlayerRespository.js");
const TeamRepository = require("../../../repositories/TeamRespository.js");
const GetPlayerUseCase = require("../../players/useCases/getPlayerUseCase.js");

const teamRepository = new TeamRepository();
const playerRepository = new PlayerRepository();
const getPlayerUseCase = new GetPlayerUseCase();

class GetTeamsUseCase {
  async execute() {
    const teamsFound = await teamRepository.getAll();
    if (!teamsFound || teamsFound.length === 0) {
      return { message: "Nenhuma equipa encontrada." };
    }
    const teams = await Promise.all(
      teamsFound.map(async (team) => {
        const playersFound = await playerRepository.findByTeamId(team.id);
        const playersDetails = await Promise.all(
          playersFound.map(async (player) => {
            try {
              const goals = await getPlayerUseCase.execute(player.id);
              return { ...player, goals: goals?.Goals || 0 };
            } catch (err) {
              console.error(
                `Erro ao buscar dados do jogador com ID ${player.id}: ${err.message}`
              );
              return { ...player, goals: null };
            }
          })
        );

        return {
          details: team,
          players: playersDetails,
        };
      })
    );

    return teams;
  }
}

module.exports = GetTeamsUseCase;
