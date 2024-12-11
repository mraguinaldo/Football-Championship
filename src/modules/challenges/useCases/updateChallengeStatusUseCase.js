const ChallengeRepository = require("../../../repositories/ChallengeRespository.js");
const TeamRepository = require("../../../repositories/TeamRespository.js");

const challengeRepository = new ChallengeRepository();
const teamRepository = new TeamRepository();

class UpdateChallengeStatusUseCase {
  async execute({ challengeId, gameStatus }) {
    const challengeFound = await challengeRepository.findById(challengeId);

    if (!challengeFound.length) {
      return 'Desafio não encontrado';
    }

    const response = await challengeRepository.updateGameStatus({ challengeId, gameStatus });

    if (!response) {
      return 'Falha ao atualizar o status do jogo';
    }

    const result = challengeFound[0].goals_scored_by_visitors - challengeFound[0].goals_scored_by_home;

    if (gameStatus === 'finished') {
      if (result > 0) {
        await teamRepository.updatePoints({
          teamId: challengeFound[0].visiting_team,
          points: 3,
        });
        await teamRepository.updatePoints({
          teamId: challengeFound[0].home_team,
          points: 0,
        });
      } else if (result === 0) {
        await teamRepository.updatePoints({
          teamId: challengeFound[0].visiting_team,
          points: 1,
        });
        await teamRepository.updatePoints({
          teamId: challengeFound[0].home_team,
          points: 1,
        });
      } else {
        await teamRepository.updatePoints({
          teamId: challengeFound[0].visiting_team,
          points: 0,
        });
        await teamRepository.updatePoints({
          teamId: challengeFound[0].home_team,
          points: 3,
        });
      }
    }

    return response;
  }
}

module.exports = UpdateChallengeStatusUseCase;
