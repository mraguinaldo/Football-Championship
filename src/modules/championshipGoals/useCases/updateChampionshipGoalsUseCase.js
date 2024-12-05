const ChallengeRepository = require("../../../repositories/ChallengeRespository.js")
const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository.js")
const PlayerRepository = require("../../../repositories/PlayerRespository.js")

const playerRepository = new PlayerRepository()
const challengeRepository = new ChallengeRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()


class UpdateChampionshipGoalsUseCase {
  async execute({ playerId, championshipGoalId, championshipGoals, challengeId }) {
    const playerFound = await playerRepository.findById(playerId)
    const challengeFound = await challengeRepository.findById(challengeId)

    const championshipGoalsFound = await championshipGoalsRepository.findByPlayerAndChampionshipGoalId(playerId, championshipGoalId)

    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }

    if (!challengeFound.length) {
      const message = 'Jogo não encontrado'
      return message
    }

    if (!championshipGoalsFound.length) {
      const message = 'Golo não encontrado'
      return message
    }

    if (playerFound.length > 0) {
      const response = await championshipGoalsRepository.update({
        playerId,
        championshipGoalId,
        challengeId,
        data: championshipGoals
      })

      if (response) {
        return response
      }
    }

  }
}



module.exports = UpdateChampionshipGoalsUseCase