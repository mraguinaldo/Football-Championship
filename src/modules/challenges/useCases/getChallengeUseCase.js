const ChallengePlayerRepository = require("../../../repositories/ChallengePlayerRespository");
const ChallengeRepository = require("../../../repositories/ChallengeRespository");
const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository");
const PlayerRepository = require("../../../repositories/PlayerRespository");
const TeamRepository = require("../../../repositories/TeamRespository");

const challengeRepository = new ChallengeRepository();
const challengePlayerRepository = new ChallengePlayerRepository();
const teamRepository = new TeamRepository();
const playerRepository = new PlayerRepository();
const championshipGoalsRepository = new ChampionshipGoalsRepository();

class GetChallengeUseCase {
  async execute(challengeId) {
    const challengeFound = await challengeRepository.findById(challengeId);

    if (!challengeFound.length) {
      return 'Desafio não encontrado';
    }

    const [visiting_team, home_team] = await Promise.all([
      teamRepository.findById(challengeFound[0].visiting_team),
      teamRepository.findById(challengeFound[0].home_team),
    ]);

    const visitingPlayersDetails = await this.getPlayersDetails(
      "visitor",
      challengeId
    );

    const homePlayersDetails = await this.getPlayersDetails(
      "home",
      challengeId
    );

    const goals = await championshipGoalsRepository.findByChallengeId(challengeId);

    return {
      challenge: challengeFound[0],
      goals: goals,
      teams: {
        visitingTeam: {
          teamDetail: visiting_team[0],
          players: visitingPlayersDetails,
        },
        homeTeam: {
          teamDetail: home_team[0],
          players: homePlayersDetails,
        },
      },
    };
  }

  async getPlayersDetails(teamType, challengeId) {
    const teamPlayers = await challengePlayerRepository.findByTeamType(
      teamType,
      challengeId
    );

    return Promise.all(
      teamPlayers.map(async (player) => {
        try {
          const playerDetail = await playerRepository.findById(player.player_id);
          const matchDetails = await challengePlayerRepository.findByPlayerIdAndChallengeId(
            player.player_id,
            challengeId
          );

          return { playerDetail, matchDetails };
        } catch (err) {
          console.error(`Erro ao buscar jogador com ID ${player.player_id}:`, err);
          return null;
        }
      })
    ).then((details) => details.filter(Boolean));
  }
}

module.exports = GetChallengeUseCase;
