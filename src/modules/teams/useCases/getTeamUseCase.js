const PlayerRepository = require("../../../repositories/PlayerRespository.js");
const TeamRepository = require("../../../repositories/TeamRespository.js");
const GetPlayerUseCase = require("../../players/useCases/getPlayerUseCase.js");

const teamRepository = new TeamRepository();
const playerRepository = new PlayerRepository();
const getPlayerUseCase = new GetPlayerUseCase();

class GetTeamUseCase {
  async execute(teamId) {
    try {
      if (!teamId) {
        throw new Error("O ID do time é obrigatório.");
      }

      const teamFound = await teamRepository.findById(teamId);
      if (!teamFound || teamFound.length === 0) {
        return { message: "Equipe não encontrada." };
      }

      const playersFound = await playerRepository.findByTeamId(teamId);

      if (!playersFound || playersFound.length === 0) {
        console.warn(`Nenhum jogador encontrado para o time com ID: ${teamId}`);
        return { details: teamFound, players: [] };
      }

      const playersDetails = await Promise.all(
        playersFound.map(async (player) => {
          try {
            const goals = await getPlayerUseCase.execute(player.id);

            return { ...player, goals: goals.Goals };
          } catch (err) {
            console.error(
              `Erro ao buscar dados do jogador com ID ${player.player_id}:`,
              err.message
            );
            return { ...player, goals: null };
          }
        })
      );

      return {
        details: teamFound,
        players: playersDetails,
      };
    } catch (error) {
      console.error("Erro ao buscar informações do time:", error.message);
      return { error: "Ocorreu um erro ao processar a solicitação." };
    }
  }
}

module.exports = GetTeamUseCase;
