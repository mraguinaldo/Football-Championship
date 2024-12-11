const Query = require("../database/index.js")

class ChallengePlayerRepository {
  async create(data) {
    const { challenge_id, player_id, team_type, it_played } = data

    const query = `
      INSERT INTO ChallengePlayers(
        challenge_id, 
        player_id, 
        team_type, 
        it_played) 
      VALUES(?, ?, ?, ?)
    `
    const response = await Query(
      query,
      [
        challenge_id,
        player_id,
        team_type,
        it_played
      ]
    )

    return response
  }
  async delete(teamId) {
    const query = `DELETE FROM Teams WHERE id = ?`
    const response = await Query(query, [teamId])

    return response
  }
  async update({ playerId, player, challengeId }) {
    const query = `
      UPDATE ChallengePlayers SET 
        challenge_id = ?, 
        player_id = ?, 
        team_type = ?, 
        it_played = ? 
      WHERE player_id = ? AND challenge_id = ?
    `
    const {
      challenge_id,
      player_id,
      team_type,
      it_played,
    } = player

    const response = await Query(
      query,
      [
        challenge_id,
        player_id,
        team_type,
        it_played,
        playerId,
        challengeId
      ]
    )

    if (response) {
      const challengePlayerUpdated = await this.findById(playerId)

      return challengePlayerUpdated
    }
  }
  async findById(playerId) {
    const query = `SELECT * FROM ChallengePlayers WHERE player_id = ?`
    const response = await Query(query, [playerId])

    return response
  }
  async findByPlayerIdAndChallengeId(playerId, challengeId) {
    const query = `SELECT * FROM ChallengePlayers WHERE player_id = ? AND challenge_id = ?`
    const response = await Query(query, [playerId, challengeId])

    return response
  }

  async findByTeamType(teamType, challenge_id) {
    const query = `
      SELECT * FROM ChallengePlayers 
        WHERE team_type = ? AND challenge_id = ?
    `

    const response = await Query(query, [teamType, challenge_id])
    return response
  }
  async findStadium(stadium) {
    const query = `SELECT * FROM Teams WHERE stadium = ?`

    const response = await Query(query, [stadium])
    return response
  }
}

module.exports = ChallengePlayerRepository