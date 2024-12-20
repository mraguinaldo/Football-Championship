const PlayerRepository = require("../../../repositories/PlayerRespository")
const ChallengeRepository = require("../../../repositories/ChallengeRespository.js")
const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository.js")

const challengeRepository = new ChallengeRepository()
const playerRepository = new PlayerRepository()
const championshipGoalsRepository = new ChampionshipGoalsRepository()

class CreateChampionshipGoalsUseCase {
  async execute({ championshipGoals }) {
    const { challenge_id, player_id } = championshipGoals
    const challengeFound = await challengeRepository.findById(challenge_id)
    const playerFound = await playerRepository.findById(player_id)

    if (!challengeFound.length) {
      const message = 'Desafio não encontrado'
      return message
    }
    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }

    const response = await championshipGoalsRepository.create(championshipGoals)

    if (response) {
      const updateGoals = await challengeRepository.updateGoalsScored({ challengeId: challenge_id, teamType: challengeFound[0].home_team === playerFound[0].team_id ? "home" : "visitor" })

      console.log(updateGoals)

      if (updateGoals) {
        return championshipGoals
      }
    }

    return response
  }
}



module.exports = CreateChampionshipGoalsUseCase