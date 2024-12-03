const TeamRepository = require("../../../repositories/TeamRespository.js")

const teamRepository = new TeamRepository()

class CreateTeamUseCase {
  async execute(teamData) {
    const teamFound = await teamRepository.findByName(teamData.name)
    const stadiumFound = await teamRepository.findStadium(teamData.stadium)

    if (teamFound.length > 0) {
      const message = 'Já existe um team com este nome'
      return message
    }

    if (stadiumFound.length > 0) {
      const message = 'Já existe um estádio com este nome'
      return message
    }

    const response = await teamRepository.create(teamData)

    if (response) {
      return teamData
    }

    return response
  }
}



module.exports = CreateTeamUseCase