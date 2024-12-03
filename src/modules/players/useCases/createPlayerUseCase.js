const TeamRepository = require("../../../repositories/TeamRespository.js")
const PlayerRepository = require("../../../repositories/PlayerRespository")

const teamRepository = new TeamRepository()
const playerRepository = new PlayerRepository()

class CreatePlayerUseCase {
  async execute(player) {
    const teamFound = await teamRepository.findById(player.team_id)

    if (!teamFound.length) {
      const message = 'Equipa não encontrada'
      return message
    }

    const response = await playerRepository.create(player)

    if (response) {
      return player
    }

    return response
  }
}



module.exports = CreatePlayerUseCase