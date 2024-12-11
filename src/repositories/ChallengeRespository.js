const Query = require("../database/index.js")

class ChallengeRepository {
  async create(challenge) {
    const {
      visiting_team,
      home_team,
      time_the_game_will_take
    } = challenge

    const query = `
      INSERT INTO Challenges(
        visiting_team, 
        home_team, 
        time_the_game_will_take
      ) VALUES(?, ?, ?)
    `
    const response = await Query(
      query,
      [
        visiting_team,
        home_team,
        time_the_game_will_take
      ]
    )

    return response
  }
  async delete(challengeId) {
    const query = `DELETE FROM Challenges WHERE id = ?`
    const response = await Query(query, [challengeId])

    return response
  }
  async update({ challengeId, challenge }) {
    const query = `
      UPDATE Challenges SET 
        total_goals_scored = ?, 
        visiting_team = ?, 
        home_team = ?, 
        goals_scored_by_visitors = ?,
        goals_scored_by_home = ?, 
        time_the_game_will_take = ?, 
        game_status = ? 
      WHERE id = ?
    `
    const {
      total_goals_scored,
      visiting_team,
      home_team,
      goals_scored_by_visitors,
      goals_scored_by_home,
      time_the_game_will_take,
      game_status
    } = challenge

    const response = await Query(
      query,
      [
        total_goals_scored,
        visiting_team,
        home_team,
        goals_scored_by_visitors,
        goals_scored_by_home,
        time_the_game_will_take,
        game_status,
        challengeId
      ]
    )

    if (response) {
      const playerUpdated = await this.findById(challengeId)

      return playerUpdated
    }
  }

  async updateGameStatus({ challengeId, gameStatus }) {
    const query = `
      UPDATE Challenges SET 
        game_status = ? 
      WHERE id = ?
    `
    const response = await Query(
      query, [gameStatus, challengeId]
    )

    if (response) {
      const challenge = await this.findById(challengeId)

      return challenge
    }
  }

  async updateGoalsScored({ challengeId, teamType }) {
    const field = teamType === "visitor" ? "goals_scored_by_visitors" : "goals_scored_by_home";

    const query = `
      UPDATE Challenges SET 
        ${field} = ${field} + 1
      WHERE id = ?
    `;

    const response = await Query(query, [challengeId]);

    if (response) {
      return this.findById(challengeId);
    }
  }


  async findById(challengeId) {
    const query = `SELECT * FROM Challenges WHERE id = ?`
    const response = await Query(query, [challengeId])

    return response
  }

  async findByChallengeStatus(challengeStatus) {
    if (challengeStatus === '') {
      const query = `SELECT * FROM Challenges`
      const response = await Query(query)

      return response
    }
    const query = `SELECT * FROM Challenges WHERE game_status = ?`
    const response = await Query(query, [challengeStatus])

    return response
  }

  async findByTeamId(teamId) {
    const query = `SELECT * FROM Challenges WHERE visiting_team = ? OR home_team = ?`
    const response = await Query(query, [teamId, teamId])

    return response
  }

  async findByTheVisitingTeamAndTheHomeTeam(visiting_team, home_team) {
    const query = `SELECT * FROM Challenges WHERE visiting_team = ? AND home_team = ?`
    const response = await Query(query, [visiting_team, home_team])

    return response
  }

}

module.exports = ChallengeRepository