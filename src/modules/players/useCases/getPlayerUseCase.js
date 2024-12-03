const PlayerRepository = require("../../../repositories/PlayerRespository")
const TeamRepository = require("../../../repositories/TeamRespository")

const playerRepository = new PlayerRepository()
const teamRepository = new TeamRepository()

class GetPlayerUseCase {
  async execute(playerId) {
    const playerFound = await playerRepository.findById(playerId)

    if (playerFound.length > 0) {
      const teamId = playerFound[0].team_id
      const teamFound = await teamRepository.findById(teamId)

      const data = {
        player: playerFound,
        team: teamFound
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