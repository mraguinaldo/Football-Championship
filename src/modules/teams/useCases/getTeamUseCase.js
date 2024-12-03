const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()

class GetTeamUseCase {
  async execute(teamId) {
    const teamFound = await teamRepository.findById(teamId)

    if (teamFound.length > 0) {
      return teamFound
    }
    if (!teamFound.length) {
      const message = 'Equipa não encontrada'
      return message
    }
  }
}



module.exports = GetTeamUseCase