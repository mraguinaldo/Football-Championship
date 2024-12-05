const Query = require("../database/index.js")

class ChampionshipGoalsRepository {
  async create(data) {
    const {
      player_id,
      time_the_goal_was_scored,
      challenge_id,
      type_goal
    } = data

    const query = `
      INSERT INTO ChampionshipGoals(
        player_id, 
        time_the_goal_was_scored, 
        challenge_id, 
        type_goal
      ) VALUES(?, ?, ?, ?)
    `
    const response = await Query(
      query,
      [
        player_id,
        time_the_goal_was_scored,
        challenge_id,
        type_goal
      ]
    )

    return response
  }
  async delete(championshipGoalId) {
    const query = `DELETE FROM ChampionshipGoals WHERE id = ?`
    const response = await Query(query, [championshipGoalId])

    return response
  }
  async update({ playerId, championshipGoalId, challengeId, data }) {
    const {
      player_id,
      time_the_goal_was_scored,
      challenge_id,
      type_goal
    } = data

    const query = `
      UPDATE ChampionshipGoals SET 
        player_id = ?, 
        time_the_goal_was_scored = ?, 
        challenge_id = ?, 
        type_goal = ? 
      WHERE player_id = ? AND id = ? AND challenge_id = ?
    `

    const response = await Query(query,
      [
        player_id,
        time_the_goal_was_scored,
        challenge_id, type_goal,
        Number(playerId),
        Number(championshipGoalId),
        Number(challengeId)
      ]
    )

    if (response) {
      const championshipGoalUpdated = await this.findById(championshipGoalId)

      return championshipGoalUpdated
    }
  }
  async findById(ChampionshipGoalId) {
    const query = `SELECT * FROM ChampionshipGoals WHERE id = ?`
    const response = await Query(query, [ChampionshipGoalId])

    return response
  }

  async findByChallengeId(findByChallengeId) {
    const query = `SELECT * FROM ChampionshipGoals WHERE challenge_id = ?`
    const response = await Query(query, [findByChallengeId])

    return response
  }

  async findByPlayerAndType(playerId, type_goal = "head" | "penalty" | "feet") {
    const query = `
      SELECT * FROM ChampionshipGoals 
        WHERE player_id = ? AND type_goal = ?
    `
    const response = await Query(query, [playerId, type_goal])

    return response
  }

  async findByPlayerAndChampionshipGoalId(playerId, championshipGoalId) {
    const query = `
      SELECT * FROM ChampionshipGoals 
        WHERE player_id = ? AND id = ?
    `
    const response = await Query(query, [playerId, championshipGoalId])

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

module.exports = ChampionshipGoalsRepository