const Query = require("../database/index.js")

class TeamRepository {
  async create(data) {
    const { name, stadium } = data

    const query = `INSERT INTO Teams(name, stadium) VALUES(?, ?)`
    const response = await Query(query, [name, stadium])

    return response
  }
  async delete(teamId) {
    const query = `DELETE FROM Teams WHERE id = ?`
    const response = await Query(query, [teamId])

    return response
  }
  async update({ teamId, teamData }) {
    const query = `UPDATE Teams SET name = ?, stadium = ?, flag = ?, captain_id = ? WHERE id = ?`
    const { name, stadium, flag, captainId } = teamData
    const response = await Query(query, [name, stadium, flag, captainId, teamId])

    if (response) {
      const teamUpdated = await this.findById(teamId)

      return teamUpdated
    }
  }
  async findById(teamId) {
    const query = `SELECT * FROM Teams WHERE id = ?`
    const response = await Query(query, [teamId])

    return response
  }

  async findByName(teamName) {
    const query = `SELECT * FROM Teams WHERE name = ?`

    const response = await Query(query, [teamName])
    return response
  }
  async findStadium(stadium) {
    const query = `SELECT * FROM Teams WHERE stadium = ?`

    const response = await Query(query, [stadium])
    return response
  }
}

module.exports = TeamRepository