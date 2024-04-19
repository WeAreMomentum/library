// HCI Home
// by Aleksander Knöbl

(function () {

  function getGameDate(game) {
    return new Date(game.scheduledDate.longValue || game.scheduledDate.formattedLong)
  }
  function getDayDiff(date1, date2) {
    return Math.round((date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000));
  }

  const referer = window.location.origin;
  const divisionId = "ice";
  const teamId = 190;
  const reqURL = "https://api.hockeydata.net/data/ih/Schedule" +
    "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
    "&referer=" + referer +
    "&divisionId=" + divisionId;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", reqURL);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const wrapper = document.querySelector('.api__games');
      let gameList = xhr.response.data.rows.filter(game => {
        return (game.homeTeamId == teamId || game.awayTeamId == teamId);
      });
      const lastGame = gameList[0];//.findLast(game => game.gameStatus == 4);
      const liveGame = gameList[0];//.find(game => game.gameStatus != 4 && game.gameStatus != 0);
      const nextGame = gameList[0];//.find(game => game.gameStatus == 0);
      const today = new Date();
      const onlyLastGame = lastGame && getDayDiff(getGameDate(lastGame), today) < 7;
      const onlyNextGame = nextGame && getDayDiff(today, getGameDate(nextGame)) < 7;
      if ((lastGame && nextGame) || liveGame || onlyLastGame || onlyNextGame) {

        /* Live */
        if (liveGame) {
          const reqURL2 = "https://api.hockeydata.net/data/ih/GetGameReport" +
            "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
            "&referer=" + referer +
            "&gameId=" + liveGame.id;
          const xhr2 = new XMLHttpRequest();
          xhr2.open("GET", reqURL2);
          xhr2.send();
          xhr2.responseType = "json";
          xhr2.onload = () => {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
              const gameData = xhr2.response.data.gameData;
              console.log(gameData);
              const gameDom = wrapper.querySelector('.api__live_game');
              gameDom.querySelector('.api__opponent_name').textContent =
                gameData.homeTeamId == teamId ? gameData.awayTeamLongname : gameData.homeTeamLongname;
              gameDom.querySelector('.api__home_team_logo').src = gameData.homeTeamLogoUrl;
              gameDom.querySelector('.api__home_team_score').textContent = gameData.homeTeamScore;
              gameDom.querySelector('.api__away_team_logo').src = gameData.awayTeamLogoUrl;
              gameDom.querySelector('.api__away_team_score').textContent = gameData.awayTeamScore;
              gameDom.querySelector('.api__live_time').textContent = Math.floor(gameData.liveTime / 60) + "'";
              let periodResults = '';
              let i = 0;
              console.log(gameData.periodStats[i].period, gameData.liveTimePeriod, gameData.periodStats[i].period != gameData.liveTimePeriod);
              while (gameData.periodStats[i].period != gameData.liveTimePeriod) {
                periodResults += gameData.periodStats[i].homeScore + ':' + gameData.periodStats[i].awayScore + ' | ';
                i++;
                console.log(gameData.periodStats[i].period, gameData.liveTimePeriod, gameData.periodStats[i].period != gameData.liveTimePeriod);
              }
              periodResults += '<span style="color:var(--red);">' + gameData.periodStats[i].homeScore + ':' + gameData.periodStats[i].awayScore + '</span>';
              gameDom.querySelector('.api__period_results').innerHTML = periodResults;
              gameDom.querySelector('.api__attendance').textContent = gameData.attendance;
              if (gameData.gameOfficials) {
                gameDom.querySelector('.api__refs').textContent =
                  gameData.gameOfficials.ref1.firstname + ' ' +
                  gameData.gameOfficials.ref1.lastname + ', ' +
                  gameData.gameOfficials.ref2.firstname + ' ' +
                  gameData.gameOfficials.ref2.lastname;
                gameDom.querySelector('.api__linesmen').textContent =
                  gameData.gameOfficials.linesman1.firstname + ' ' +
                  gameData.gameOfficials.linesman1.lastname + ', ' +
                  gameData.gameOfficials.linesman2.firstname + ' ' +
                  gameData.gameOfficials.linesman2.lastname;
              }
              const dateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
              gameDom.querySelector('.api__date_and_time').textContent =
                getGameDate(gameData).toLocaleDateString("de-AT", dateOptions) + ' | ' +
                gameData.scheduledTime + ' Uhr';
              gameDom.querySelector('.api__location').textContent = gameData.location.longname;
              gameDom.querySelector('.api__is_overtime').style.display = gameData.isOvertime ? 'block' : 'none';
              gameDom.querySelector('.api__is_shoot_out').style.display = gameData.isShootOut ? 'block' : 'none';
            } else {
              console.log(`Error: ${xhr2.status}`);
            }
          };
        } else {
          wrapper.querySelector('.api__live_game').style.display = 'none';
        }

        /* letztes Spiel */
        if (lastGame) {
          const gameData = lastGame;
          const gameDom = wrapper.querySelector('.api__last_game');
          if (gameData.homeTeamId == teamId) gameDom.classList.add('home-game--home');
          if (gameData.awayTeamId == teamId) gameDom.classList.add('home-game--away');
          gameDom.querySelector('.api__opponent_name').textContent =
            gameData.homeTeamId == teamId ? gameData.awayTeamLongName : gameData.homeTeamLongName;
          gameDom.querySelector('.api__home_team_logo').src = gameData.homeTeamLogoUrl;
          gameDom.querySelector('.api__home_team_score').textContent = gameData.homeTeamScore;
          gameDom.querySelector('.api__away_team_logo').src = gameData.awayTeamLogoUrl;
          gameDom.querySelector('.api__away_team_score').textContent = gameData.awayTeamScore;
          gameDom.querySelector('.api__is_overtime').style.display = gameData.isOvertime ? 'block' : 'none';
          gameDom.querySelector('.api__is_shoot_out').style.display = gameData.isShootOut ? 'block' : 'none';
          const scheduledDate = getGameDate(gameData);
          const dateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
          gameDom.querySelector('.api__date_and_time').textContent =
            scheduledDate.toLocaleDateString("de-AT", dateOptions) + ' | ' +
            gameData.scheduledTime + ' Uhr';
          gameDom.querySelector('.api__location').textContent = gameData.location.longname;
        } else {

        }

        /* nächstes Spiel */
        if (nextGame) {
          const gameData = nextGame;
          const gameDom = wrapper.querySelector('.api__next_game');
          gameDom.querySelector('.api__home_team_logo').src = gameData.homeTeamLogoUrl;
          gameDom.querySelector('.api__away_team_logo').src = gameData.awayTeamLogoUrl;
          gameDom.querySelector('.api__opponent_name').textContent =
            gameData.homeTeamId == teamId ? gameData.awayTeamLongName : gameData.homeTeamLongName;
          const scheduledDate = getGameDate(gameData);
          const dateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
          gameDom.querySelector('.api__scheduled_date').textContent = scheduledDate.toLocaleDateString("de-AT", dateOptions);
          gameDom.querySelector('.api__scheduled_time').textContent = gameData.scheduledTime + ' Uhr';
          gameDom.querySelector('.api__location').textContent = gameData.location.longname;
        } else {

        }

      } else {
        wrapper.style.display = 'none';
      }
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

})();