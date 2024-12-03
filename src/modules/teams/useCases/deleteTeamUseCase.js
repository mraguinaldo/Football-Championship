const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()

class DeleteTeamUseCase {
  async execute(teamId) {
    const teamFound = await teamRepository.findById(teamId)

    if (teamFound.length > 0) {
      const response = await teamRepository.delete(teamId)

      if (response) {
        return teamFound
      }
    }
    if (!teamFound.length) {
      const message = 'Equipa não encontrada'
      return message
    }
  }
}



module.exports = DeleteTeamUseCase