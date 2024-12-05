const PlayerRepository = require("../../../repositories/PlayerRespository")

const playerRepository = new PlayerRepository()

class DeleteChallengePlayerUseCase {
  async execute(playerId) {
    const playerFound = await playerRepository.findById(playerId)

    if (playerFound.length > 0) {
      const response = await playerRepository.delete(playerId)

      if (response) {
        return playerFound
      }
    }
    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }
  }
}



module.exports = DeleteChallengePlayerUseCase