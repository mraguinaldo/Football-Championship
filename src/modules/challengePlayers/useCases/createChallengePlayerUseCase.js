const ChallengePlayerRepository = require("../../../repositories/ChallengePlayerRespository.js")
const ChallengeRepository = require("../../../repositories/ChallengeRespository.js")

const challengePlayerRepository = new ChallengePlayerRepository()
const challengeRepository = new ChallengeRepository()

class CreateChallengePlayerUseCase {
  async execute({ challengeId, team_type, players = [] }) {
    let playersInserted = []
    let playerNotFound = ''


    const challengeFound = await challengeRepository.findById(challengeId)

    if (!challengeFound.length) {
      const message = "Partida não encontrada"

      return message
    }

    players.map((player) => {
      player.challenge_id = Number(challengeId),
        player.team_type = team_type
      const playerId = player.player_id

      const playerFound = challengePlayerRepository.findByPlayerIdAndChallengeId(playerId, challengeId)

      playerFound.then((data) => {
        if (data.length > 0) {
          const challengePlayerUpdated = challengePlayerRepository.update({ playerId, player, challengeId })

          if (challengePlayerUpdated) {
            playersInserted.push(challengePlayerUpdated)
          }
        } else {
          const response = challengePlayerRepository.create(player)

          response.then((data) => {
            if (data) playersInserted.push(player)
          }).catch((err) => {
            if (String(err).includes("foreign key constraint fails")) {
              playerNotFound = "Jogador não encontrado"
            }
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    })

    return players

  }
}

module.exports = CreateChallengePlayerUseCase