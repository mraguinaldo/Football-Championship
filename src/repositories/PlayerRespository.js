const Query = require("../database/index.js")

class PlayerRepository {
  async create(data) {
    const {
      name,
      shirt_number,
      position,
      age,
      weight,
      team_id
    } = data

    const query = `
      INSERT INTO Players(
        name, 
        shirt_number, 
        position, 
        age, 
        weight, 
        team_id ) VALUES(?, ?, ?, ?, ?, ?)
    `
    const response = await Query(
      query,
      [name, shirt_number, position, age, weight, team_id]
    )

    return response
  }
  async delete(playerId) {
    const query = `DELETE FROM Players WHERE id = ?`
    const response = await Query(query, [playerId])

    return response
  }
  async update({ playerId, player }) {
    const query = `
      UPDATE Players SET 
        name = ?, 
        shirt_number = ?, 
        position = ?, 
        age = ?, 
        weight = ?, 
        team_id = ? 
      WHERE id = ?
    `
    const {
      name,
      shirt_number,
      position,
      age,
      weight,
      team_id
    } = player

    const response = await Query(
      query,
      [
        name,
        shirt_number,
        position,
        age,
        weight,
        team_id,
        playerId
      ]
    )

    if (response) {
      const playerUpdated = await this.findById(playerId)

      return playerUpdated
    }
  }
  async findById(playerId) {
    const query = `SELECT * FROM Players WHERE id = ?`
    const response = await Query(query, [playerId])

    return response
  }

  async findByTeamId(team_id) {
    const query = `SELECT * FROM Players WHERE team_id = ?`
    const response = await Query(query, [team_id])

    return response
  }

  async findByShirtNumber(shirtNumber, team_id) {
    const query = `SELECT * FROM Players WHERE shirt_number = ? and team_id = ?`
    const response = await Query(query, [shirtNumber, team_id])

    return response
  }

  async findByName(playerName) {
    const query = `SELECT * FROM Players WHERE name = ?`

    const response = await Query(query, [playerName])
    return response
  }
  async findStadium(stadium) {
    const query = `SELECT * FROM Teams WHERE stadium = ?`

    const response = await Query(query, [stadium])
    return response
  }
}

module.exports = PlayerRepository