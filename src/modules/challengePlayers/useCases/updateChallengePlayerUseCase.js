const PlayerRepository = require("../../../repositories/PlayerRespository.js")
const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()
const playerRepository = new PlayerRepository()

class UpdateChallengePlayerUseCase {
  async execute({ playerId, player }) {
    const playerFound = await playerRepository.findById(playerId)

    const teamFound = await teamRepository.findById(player.team_id)

    if (!teamFound.length) {
      const message = 'Equipa não encontrada'
      return message
    }

    if (playerFound.length > 0) {
      const response = await playerRepository.update({ playerId, player })

      if (response) {
        return response
      }
    }
    if (!playerFound.length) {
      const message = 'Jogador não encontrado'
      return message
    }
  }
}

module.exports = UpdateChallengePlayerUseCase