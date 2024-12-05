const ChallengeRepository = require("../../../repositories/ChallengeRespository.js")
const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()
const challengeRepository = new ChallengeRepository()

class UpdateChallengeUseCase {
  async execute({ challengeId, challenge }) {
    const challengeFound = await challengeRepository.findById(challengeId)

    const visiting_team = await teamRepository.findById(challenge.visiting_team)
    const home_team = await teamRepository.findById(challenge.home_team)

    if (!home_team.length && !visiting_team.length) {
      const message = 'Equipas não encontradas'
      return message
    }

    if (!visiting_team.length) {
      const message = 'Equipa visitante não encontrada'
      return message
    }
    if (!home_team.length) {
      const message = 'Equipa da casa não encontrada'
      return message
    }

    if (challenge.visiting_team === challenge.home_team) {
      const message = 'As equipas devem ser diferentes'
      return message
    }

    if (challengeFound.length > 0) {
      const response = await challengeRepository.update({ challengeId, challenge })

      if (response) {
        return response
      }
    }
    if (!challengeFound.length) {
      const message = 'Desafio não encontrado'
      return message
    }
  }
}



module.exports = UpdateChallengeUseCase