// HCI Player Stats
// by Aleksander Knöbl

(function () {

  /* Spielerstatistiken */
  const referer = window.location.origin;
  const divisionId = "ice";
  const teamId = 190;
  const reqURL = "https://api.hockeydata.net/data/ih/LeaderFieldPlayers" +
    "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
    "&referer=" + referer +
    "&divisionId=" + divisionId;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", reqURL);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const leaderboard = xhr.response.data.rows;
      const teamLeaderboard = leaderboard.filter(playerData => playerData.teamId == teamId);
      const teamTableDom = document.querySelector('.api__team_table');
      const tbodyDom = teamTableDom.querySelector('tbody');
      const trDom = tbodyDom.querySelector('tr');
      teamLeaderboard.forEach(playerData => {
        const newTrDom = trDom.cloneNode(true);
        newTrDom.querySelector('.api__rank').textContent = leaderboard.indexOf(playerData) + 1;
        newTrDom.querySelector('.api__player_name').textContent = playerData.playerLastname + ' ' + playerData.playerFirstname;
        //newTrDom.querySelector('.api__team_logo img').src = teamData.images.teamLogo;
        newTrDom.querySelector('.api__team_shortname').textContent = playerData.teamShortname;
        newTrDom.querySelector('.api__player_jersey_nr').textContent = playerData.playerJerseyNr;
        newTrDom.querySelector('.api__position').textContent = playerData.position;
        newTrDom.querySelector('.api__games_played').textContent = playerData.gamesPlayed;
        newTrDom.querySelector('.api__goals').textContent = playerData.goals;
        newTrDom.querySelector('.api__assists').textContent = playerData.assists;
        newTrDom.querySelector('.api__points').textContent = playerData.points;
        newTrDom.querySelector('.api__plus_minus').textContent = playerData.plusMinus;
        newTrDom.querySelector('.api__penalty_minutes').textContent = playerData.penaltyMinutes;
        tbodyDom.appendChild(newTrDom);
      });
      trDom.remove();
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

  /* Torhüterstatistiken */
  const reqURL2 = "https://api.hockeydata.net/data/ih/LeaderGoalkeepers" +
    "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
    "&referer=" + referer +
    "&divisionId=" + divisionId;
  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", reqURL2);
  xhr2.send();
  xhr2.responseType = "json";
  xhr2.onload = () => {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      const leaderboard = xhr2.response.data.rows;
      const teamLeaderboard = leaderboard.filter(playerData => playerData.teamId == teamId);
      const teamTableDom = document.querySelector('.api__goalie_table');
      const tbodyDom = teamTableDom.querySelector('tbody');
      const trDom = tbodyDom.querySelector('tr');
      teamLeaderboard.forEach(playerData => {
        const newTrDom = trDom.cloneNode(true);
        newTrDom.querySelector('.api__rank').textContent = leaderboard.indexOf(playerData) + 1;
        newTrDom.querySelector('.api__player_name').textContent = playerData.playerLastname + ' ' + playerData.playerFirstname;
        //newTrDom.querySelector('.api__team_logo img').src = teamData.images.teamLogo;
        newTrDom.querySelector('.api__team_shortname').textContent = playerData.teamShortname;
        newTrDom.querySelector('.api__player_jersey_nr').textContent = playerData.playerJerseyNr;
        newTrDom.querySelector('.api__position').textContent = playerData.position;
        newTrDom.querySelector('.api__games_played').textContent = playerData.gamesPlayed;
        newTrDom.querySelector('.api__goals').textContent = playerData.goals;
        newTrDom.querySelector('.api__assists').textContent = playerData.assists;
        newTrDom.querySelector('.api__shots_against').textContent = playerData.shotsAgainst;
        newTrDom.querySelector('.api__save_percentage').textContent = playerData.savePercentage;
        newTrDom.querySelector('.api__penalty_minutes').textContent = playerData.penaltyMinutes;
        tbodyDom.appendChild(newTrDom);
      });
      trDom.remove();
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

})();