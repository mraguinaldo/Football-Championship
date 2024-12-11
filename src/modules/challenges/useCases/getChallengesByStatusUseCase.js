const ChallengePlayerRepository = require("../../../repositories/ChallengePlayerRespository")
const ChallengeRepository = require("../../../repositories/ChallengeRespository")
const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository")
const PlayerRepository = require("../../../repositories/PlayerRespository")
const TeamRepository = require("../../../repositories/TeamRespository")

const challengeRepository = new ChallengeRepository()
const challengePlayerRepository = new ChallengePlayerRepository()
const teamRepository = new TeamRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()
const playerRepository = new PlayerRepository();

class GetChallengesByStatusUseCase {
  async execute({ challenge_status }) {
    try {
      const challenges = await challengeRepository.findByChallengeStatus(`${challenge_status}`);

      if (!challenges || challenges.length === 0) {
        return { message: "Nenhum desafio encontrado para o time especificado." };
      }

      const results = await Promise.all(
        challenges.map(async (challenge) => {
          const challengeDetails = await challengeRepository.findById(challenge.id);

          if (!challengeDetails || challengeDetails.length === 0) {
            return { message: "Detalhes do desafio não encontrados." };
          }

          const challengeDetail = challengeDetails[0];

          const [visitingTeam, homeTeam] = await Promise.all([
            teamRepository.findById(challengeDetail.visiting_team),
            teamRepository.findById(challengeDetail.home_team),
          ]);

          const [visitingTeamPlayers, homeTeamPlayers] = await Promise.all([
            challengePlayerRepository.findByTeamType("visitor", challengeDetail.id),
            challengePlayerRepository.findByTeamType("home", challengeDetail.id),
          ]);

          const visitingPlayersDetails = await this.getPlayerDetails(visitingTeamPlayers);
          const homePlayersDetails = await this.getPlayerDetails(homeTeamPlayers);

          const goals = await championshipGoalsRepository.findByChallengeId(challengeDetail.id);

          return {
            challenge: challengeDetail,
            goals,
            teams: {
              visitingTeam: {
                teamDetail: visitingTeam[0],
                players: visitingPlayersDetails[0],
              },
              homeTeam: {
                teamDetail: homeTeam[0],
                players: homePlayersDetails[0],
              },
            },
          };
        })
      );

      return results;
    } catch (error) {
      console.error("Erro ao buscar desafios:", error);
      throw new Error("Erro ao processar a solicitação.");
    }
  }

  async getPlayerDetails(players) {
    return Promise.all(
      players.map(async (player) => {
        try {
          return await playerRepository.findById(player.player_id);
        } catch (err) {
          console.error(`Erro ao buscar jogador com ID ${player.player_id}:`, err);
          return null;
        }
      })
    );
  }
}



module.exports = GetChallengesByStatusUseCase