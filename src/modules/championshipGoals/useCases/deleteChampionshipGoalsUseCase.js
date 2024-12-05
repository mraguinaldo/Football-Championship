const ChampionshipGoalsRepository = require("../../../repositories/championshipGoalsRepository.js")

const championshipGoalsRepository = new ChampionshipGoalsRepository()

class DeleteChampionshipGoalsUseCase {
  async execute(championshipGoalId) {
    const championshipGoalsFound = await championshipGoalsRepository.findById(championshipGoalId)

    if (!championshipGoalsFound.length) {
      const message = 'Golo não encontrado'
      return message
    }

    const response = await championshipGoalsRepository.delete(championshipGoalId)

    if (response) {
      return championshipGoalsFound
    }
  }
}



module.exports = DeleteChampionshipGoalsUseCase