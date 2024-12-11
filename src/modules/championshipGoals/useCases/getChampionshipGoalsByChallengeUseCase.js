const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository")
const PlayerRepository = require("../../../repositories/PlayerRespository")

const playerRepository = new PlayerRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()

class GetChampionshipGoalsByChallengeUseCase {
  async execute(playerId, challengeId) {
    const playerFound = await playerRepository.findById(playerId)

    if (playerFound.length > 0) {
      const goals = championshipGoalsRepository.findByPlayerIdAndChallengeId(playerId, challengeId)

      return goals
    }
    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }
  }
}



module.exports = GetChampionshipGoalsByChallengeUseCase