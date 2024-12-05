const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository")
const PlayerRepository = require("../../../repositories/PlayerRespository")
const TeamRepository = require("../../../repositories/TeamRespository")

const playerRepository = new PlayerRepository()
const teamRepository = new TeamRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()

class GetPlayerUseCase {
  async execute(playerId) {
    const playerFound = await playerRepository.findById(playerId)

    if (playerFound.length > 0) {
      const teamId = playerFound[0].team_id
      const teamFound = await teamRepository.findById(teamId)

      const head_goals = await championshipGoalsRepository.findByPlayerAndType(playerId, "head")
      const penalty_goals = await championshipGoalsRepository.findByPlayerAndType(playerId, "penalty")
      const goals_with_the_foot = await championshipGoalsRepository.findByPlayerAndType(playerId, "feet")

      const totalGoals = head_goals.length + penalty_goals.length + goals_with_the_foot.length;

      const data = {
        player: playerFound,
        team: teamFound,
        Goals: {
          totalGoals: totalGoals,
          head_goals,
          penalty_goals,
          goals_with_the_foot
        }
      }

      return data
    }
    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }
  }
}



module.exports = GetPlayerUseCase