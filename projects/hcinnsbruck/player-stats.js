// HCI Player Stats
// by Aleksander Knöbl

(function () {

  /* Spielerstatistiken */
  const reqURL3 = "https://api.hockeydata.net/data/ih/LeaderFieldPlayers" +
    "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
    "&referer=" + referer +
    "&divisionId=" + divisionId;
  const xhr3 = new XMLHttpRequest();
  xhr3.open("GET", reqURL3);
  xhr3.send();
  xhr3.responseType = "json";
  xhr3.onload = () => {
    if (xhr3.readyState == 4 && xhr3.status == 200) {
      const leaderboard = xhr3.response.data.rows;
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
      console.log(`Error: ${xhr3.status}`);
    }
  };

})();