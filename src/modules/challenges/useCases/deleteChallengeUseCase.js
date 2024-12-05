const ChallengeRepository = require("../../../repositories/ChallengeRespository")

const challengeRepository = new ChallengeRepository()

class DeleteChallengeUseCase {
  async execute(challengeId) {
    const challengeFound = await challengeRepository.findById(challengeId)

    if (challengeFound.length > 0) {
      const response = await challengeRepository.delete(challengeId)

      if (response) {
        return challengeFound
      }
    }
    if (!challengeFound.length) {
      const message = 'Desafio não encontrado'
      return message
    }
  }
}



module.exports = DeleteChallengeUseCase