const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="list-group-item">${score.name} - ${score.score}</li>`;
    }).join('');