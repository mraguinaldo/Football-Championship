const ChallengePlayerRepository = require("../../../repositories/ChallengePlayerRespository")
const ChallengeRepository = require("../../../repositories/ChallengeRespository")
const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository")
const PlayerRepository = require("../../../repositories/PlayerRespository")
const TeamRepository = require("../../../repositories/TeamRespository")

const challengeRepository = new ChallengeRepository()
const challengePlayerRepository = new ChallengePlayerRepository()
const teamRepository = new TeamRepository()
const playerRepository = new PlayerRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()

class GetChallengeUseCase {
  async execute(challengeId) {
    const challengeFound = await challengeRepository.findById(challengeId)

    if (challengeFound.length > 0) {
      const visiting_team = await teamRepository.findById(challengeFound[0].visiting_team)
      const home_team = await teamRepository.findById(challengeFound[0].home_team)

      const visiting_team_players = await challengePlayerRepository.findByTeamType(
        "visitor",
        challengeId
      )

      const home_team_players = await challengePlayerRepository.findByTeamType(
        "home",
        challengeId
      )

      const visitingPlayersDetails = await Promise.all(
        visiting_team_players.map(async (player) => {
          try {
            const playerDetail = await playerRepository.findById(player.player_id);
            return playerDetail;
          } catch (err) {
            console.error(`Erro ao buscar jogador com ID ${player.player_id}:`, err);
          }
        })
      );

      const homePlayersDetails = await Promise.all(
        home_team_players.map(async (player) => {
          try {
            const playerDetail = await playerRepository.findById(player.player_id);
            return playerDetail;
          } catch (err) {
            console.error(`Erro ao buscar jogador com ID ${player.player_id}:`, err);
          }
        })
      );

      const goals = await championshipGoalsRepository.findByChallengeId(challengeId)

      const data = {
        challenge:
          challengeFound[0],
        Goals: goals,
        teams: {
          visitingTeam: {
            teamDetail: visiting_team[0],
            players: visitingPlayersDetails[0]
          },
          homeTeam: {
            teamDetail: home_team[0],
            players: homePlayersDetails[0]
          }
        }
      }

      return data
    }
    if (!challengeFound.length) {
      const message = 'Desafio não encontrado'
      return message
    }
  }
}



module.exports = GetChallengeUseCase