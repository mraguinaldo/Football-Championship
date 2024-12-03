const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()

class UpdateTeamUseCase {
  async execute({ teamId, teamData }) {
    const teamFound = await teamRepository.findById(teamId)

    if (teamFound.length > 0) {
      const response = await teamRepository.update({ teamId, teamData })

      if (response) {
        return response
      }
    }
    if (!teamFound.length) {
      const message = 'Equipa não encontrada'
      return message
    }
  }
}



module.exports = UpdateTeamUseCase