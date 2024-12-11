const Query = require("../database/index.js")

class TeamRepository {
  async create(data) {
    const { name, stadium, flag } = data

    const query = `INSERT INTO Teams(name, stadium, flag) VALUES(?, ?, ?)`
    const response = await Query(query, [name, stadium, flag])

    return response
  }
  async delete(teamId) {
    const query = `DELETE FROM Teams WHERE id = ?`
    const response = await Query(query, [teamId])

    return response
  }
  async update({ teamId, teamData }) {
    const query = `
      UPDATE Teams SET 
        name = ?, 
        stadium = ?, 
        flag = ?, 
        captain_id = ?, 
        points = ?
      WHERE id = ?
    `
    const { name, stadium, flag, captain_id, points } = teamData
    const response = await Query(query, [name, stadium, flag, captain_id, Number(points), Number(teamId)])

    if (response) {
      const teamUpdated = await this.findById(teamId)

      return teamUpdated
    }
  }

  async updatePoints({ teamId, points }) {
    const query = `
      UPDATE Teams SET 
        points = points + ?
      WHERE id = ?
    `;

    const response = await Query(query, [points, Number(teamId)])

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

  async getAll() {
    const query = `SELECT * FROM Teams ORDER BY points DESC`;

    const response = await Query(query)

    return response
  }

  async findByName(teamName) {
    const query = `SELECT * FROM Teams WHERE name = ? `

    const response = await Query(query, [teamName])
    return response
  }
  async findStadium(stadium) {
    const query = `SELECT * FROM Teams WHERE stadium = ? `

    const response = await Query(query, [stadium])
    return response
  }
}

module.exports = TeamRepository