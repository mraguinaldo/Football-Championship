const TeamRepository = require("../../../repositories/TeamRespository.js")
const PlayerRepository = require("../../../repositories/PlayerRespository")
const ChallengeRepository = require("../../../repositories/ChallengeRespository.js")

const teamRepository = new TeamRepository()
const challengeRepository = new ChallengeRepository()

class CreateChallengeUseCase {
  async execute(currentChallenge) {
    const visiting_team = await teamRepository.findById(currentChallenge.visiting_team)
    const home_team = await teamRepository.findById(currentChallenge.home_team)

    const challengeFound = await challengeRepository.findByTheVisitingTeamAndTheHomeTeam(currentChallenge.visiting_team, currentChallenge.home_team)


    if (!home_team.length && !visiting_team.length) {
      const message = 'Equipas não encontradas'
      return message
    }

    if (!visiting_team.length) {
      const message = 'Equipa visitante não encontrada'
      return message
    }

    if (!home_team.length) {
      const message = 'Equipa da casa não encontrada'
      return message
    }

    if (currentChallenge.visiting_team === currentChallenge.home_team) {
      const message = 'As equipas devem ser diferentes'
      return message
    }

    if (challengeFound.length > 0) {
      const message = 'Já existe um desafio com estas característas'
      return message
    }

    const response = await challengeRepository.create(currentChallenge)

    if (response) {
      const challenge = {
        visiting_team,
        home_team,
        time_the_game_will_take: currentChallenge.time_the_game_will_take
      }

      return challenge
    }

    return challenge
  }
}



module.exports = CreateChallengeUseCase