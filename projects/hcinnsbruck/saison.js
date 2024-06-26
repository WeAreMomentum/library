// HCI Saison
// by Aleksander Knöbl

(function () {

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

      /* Ergebnisse / Spielplan */
      ['ergebnisse', 'spielplan'].forEach(tabName => {
        const tabDom = document.querySelector('.w-tab-pane.api__' + tabName);
        let gameList = xhr.response.data.rows.filter(game => {
          const gameStatus = tabName == 'spielplan' ? 0 : 4;
          return (game.homeTeamId == teamId || game.awayTeamId == teamId);// && game.gameStatus == gameStatus;
        });
        if (gameList.length > 0) {
          let singleGame;
          if (tabName == 'spielplan') {
            singleGame = gameList.shift();
          } else {
            singleGame = gameList.pop();
            gameList.reverse();
          }
          const gameListDom = tabDom.querySelector('.api__game_list');
          const gameDom = gameListDom.querySelector('.api__game');
          gameList.forEach(game => {
            const newGameDom = gameDom.cloneNode(true);
            gameListDom.appendChild(newGameDom);
            newGameDom.querySelector('[data-filter="tag"][data-filter-tag="location"]').textContent =
              game.homeTeamId == teamId ? 'home' :
                game.awayTeamId == teamId ? 'away' : '';
            newGameDom.querySelector('.api__location').textContent = game.location.longname;
            const scheduledDate = new Date(game.scheduledDate.longValue || game.scheduledDate.formattedLong);
            const dateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
            newGameDom.querySelector('.api__date_and_time').textContent =
              scheduledDate.toLocaleDateString("de-AT", dateOptions) + ' | ' +
              game.scheduledTime + ' Uhr';
            newGameDom.querySelector('.api__home_team_long_name').textContent = game.homeTeamLongName;
            newGameDom.querySelector('.api__away_team_long_name').textContent = game.awayTeamLongName;
            newGameDom.querySelector('.api__home_team_logo').src = game.homeTeamLogoUrl;
            newGameDom.querySelector('.api__away_team_logo').src = game.awayTeamLogoUrl;
            if (game.gameStatus == 4) {
              if (game.homeTeamId == teamId) newGameDom.classList.add('game-item--home');
              if (game.awayTeamId == teamId) newGameDom.classList.add('game-item--away');
              newGameDom.querySelector('.api__home_team_score').textContent = game.homeTeamScore;
              newGameDom.querySelector('.api__away_team_score').textContent = game.awayTeamScore;
              newGameDom.querySelector('.api__is_overtime').style.display = game.isOvertime ? 'block' : 'none';
              newGameDom.querySelector('.api__is_shoot_out').style.display = game.isShootOut ? 'block' : 'none';
            }
            //newGameDom.querySelector('.api__article').href = '';
          });
          gameDom.remove();
          const reqURL2 = "https://api.hockeydata.net/data/ih/GetGameReport" +
            "?apiKey=738aba5a0c15ea7da496e1cda6922ff1" +
            "&referer=" + referer +
            "&gameId=" + singleGame.id;
          const xhr2 = new XMLHttpRequest();
          xhr2.open("GET", reqURL2);
          xhr2.send();
          xhr2.responseType = "json";
          xhr2.onload = () => {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
              const gameData = xhr2.response.data.gameData;
              const singleGameDom = tabDom.querySelector('.api__single_game');
              singleGameDom.querySelector('.api__opponent_name').textContent =
                gameData.homeTeamId == teamId ? gameData.awayTeamLongname : gameData.homeTeamLongname;
              singleGameDom.querySelector('.api__home_team_logo').src = gameData.images.homeTeamLogo;
              singleGameDom.querySelector('.api__away_team_logo').src = gameData.images.awayTeamLogo;
              if (gameData.gameOfficials) {
                singleGameDom.querySelector('.api__refs').textContent =
                  gameData.gameOfficials.ref1.firstname + ' ' +
                  gameData.gameOfficials.ref1.lastname + ', ' +
                  gameData.gameOfficials.ref2.firstname + ' ' +
                  gameData.gameOfficials.ref2.lastname;
                singleGameDom.querySelector('.api__linesmen').textContent =
                  gameData.gameOfficials.linesman1.firstname + ' ' +
                  gameData.gameOfficials.linesman1.lastname + ', ' +
                  gameData.gameOfficials.linesman2.firstname + ' ' +
                  gameData.gameOfficials.linesman2.lastname;
              }
              const scheduledDate = new Date(gameData.scheduledDate.longValue || gameData.scheduledDate.formattedLong);
              const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
              singleGameDom.querySelector('.api__scheduled_date').textContent = scheduledDate.toLocaleDateString("de-AT", options);
              singleGameDom.querySelector('.api__time_and_location').textContent =
                gameData.scheduledTime + ' Uhr, ' +
                gameData.location.longname;
              if (tabName == 'ergebnisse') {
                if (gameData.homeTeamId == teamId) singleGameDom.classList.add('single-game--home');
                if (gameData.awayTeamId == teamId) singleGameDom.classList.add('single-game--away');
                singleGameDom.querySelector('.api__attendance').textContent = gameData.attendance;
                singleGameDom.querySelector('.api__home_team_score').textContent = gameData.homeTeamScore;
                singleGameDom.querySelector('.api__away_team_score').textContent = gameData.awayTeamScore;
                let periodResults = '';
                gameData.periodStats.forEach((period, i) => {
                  periodResults += period.homeScore + ':' + period.awayScore;
                  periodResults += (i + 1) < gameData.periodStats.length ? ' | ' : '';
                });
                singleGameDom.querySelector('.api__period_results').textContent = periodResults;
                singleGameDom.querySelector('.api__is_overtime').style.display = gameData.isOvertime ? 'block' : 'none';
                singleGameDom.querySelector('.api__is_shoot_out').style.display = gameData.isShootOut ? 'block' : 'none';
              }
              //singleGameDom.querySelector('.api__article').href = '';
            } else {
              console.log(`Error: ${xhr2.status}`);
            }
          };
        } else {
          document.querySelectorAll('.api__' + tabName).forEach(elem => {
            elem.style.display = 'none';
          });
        }
      });

      /* Spieltag */
      const tabName = 'spieltag';
      const tabDom = document.querySelector('.w-tab-pane.api__' + tabName);
      if (xhr.response.data.rows.length > 0) {
        function getDateString(date) {
          return date.getFullYear() + '-' + ("00" + (date.getMonth() + 1)).slice(-2) + '-' + ("00" + date.getDate()).slice(-2);
        }
        const currentDom = tabDom.querySelector('.api__current_day');
        const prevDom = tabDom.querySelector('.api__prev_day');
        const prevDomText = prevDom.querySelector('.api__prev_day_text');
        const nextDom = tabDom.querySelector('.api__next_day');
        const nextDomText = nextDom.querySelector('.api__next_day_text');
        const gameListDom = tabDom.querySelector('.api__game_list');
        const gameDom = gameListDom.querySelector('.api__game');
        let gameList = {};
        xhr.response.data.rows.forEach(game => {
          const newGameDom = gameDom.cloneNode(true);
          newGameDom.querySelector('.api__location').textContent = game.location.longname;
          const scheduledDate = new Date(game.scheduledDate.longValue || game.scheduledDate.formattedLong);
          const dateOptions = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
          newGameDom.querySelector('.api__date_and_time').textContent =
            scheduledDate.toLocaleDateString("de-AT", dateOptions) + ' | ' +
            game.scheduledTime + ' Uhr';
          newGameDom.querySelector('.api__home_team_long_name').textContent = game.homeTeamLongName;
          newGameDom.querySelector('.api__away_team_long_name').textContent = game.awayTeamLongName;
          newGameDom.querySelector('.api__home_team_logo').src = game.homeTeamLogoUrl;
          newGameDom.querySelector('.api__away_team_logo').src = game.awayTeamLogoUrl;
          newGameDom.querySelector('.api__is_overtime').style.display = game.isOvertime ? 'block' : 'none';
          newGameDom.querySelector('.api__is_shoot_out').style.display = game.isShootOut ? 'block' : 'none';
          if (game.gameStatus == 4) {
            if (game.homeTeamId == teamId) newGameDom.classList.add('game-item--home');
            if (game.awayTeamId == teamId) newGameDom.classList.add('game-item--away');
            newGameDom.querySelector('.api__home_team_score').textContent = game.homeTeamScore;
            newGameDom.querySelector('.api__away_team_score').textContent = game.awayTeamScore;
          }
          newGameDom.querySelector(game.gameStatus == 4 ? '.api__future_buttons' : '.api__past_buttons').remove();
          if (game.homeTeamId == teamId || game.awayTeamId == teamId) {
            //newGameDom.querySelector('.api__article').href = '';
          } else {
            newGameDom.querySelector(game.gameStatus == 4 ? '.api__past_buttons' : '.api__future_buttons').remove();
          }
          gameList[getDateString(scheduledDate)] = gameList[getDateString(scheduledDate)] || [];
          gameList[getDateString(scheduledDate)].push(newGameDom);
        });
        gameDom.remove();

        const gameListDays = Object.keys(gameList);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let currentDateString = gameListDays.find(DateString => new Date(DateString) >= today) || gameListDays[gameListDays.length - 1];
        let prevDateString = '';
        let nextDateString = '';

        function getPrevDay(DateString) {
          const i = gameListDays.indexOf(DateString);
          return i !== -1 && gameListDays[i - 1];
        }
        function getNextDay(DateString) {
          const i = gameListDays.indexOf(DateString);
          return i !== -1 && gameListDays[i + 1];
        }
        function showDay(DateString) {
          currentDateString = DateString;
          prevDateString = getPrevDay(DateString);
          nextDateString = getNextDay(DateString);
          let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          let date = new Date(currentDateString);
          currentDom.textContent = date.toLocaleDateString("de-AT", dateOptions);
          dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
          if (prevDateString) {
            prevDom.style = '';
            date = new Date(prevDateString);
            prevDomText.textContent = date.toLocaleDateString("de-AT", dateOptions);
          } else {
            prevDom.style = 'opacity:0;pointer-events:none;';
          }
          if (nextDateString) {
            nextDom.style = '';
            date = new Date(nextDateString);
            nextDomText.textContent = date.toLocaleDateString("de-AT", dateOptions);
          } else {
            nextDom.style = 'opacity:0;pointer-events:none;';
          }
          [...gameListDom.children].forEach(elem => elem.remove());
          gameList[currentDateString].forEach(elem => gameListDom.appendChild(elem));
        }
        function showPrev() {
          showDay(prevDateString);
        }
        function showNext() {
          showDay(nextDateString);
        }

        prevDom.addEventListener('click', showPrev);
        nextDom.addEventListener('click', showNext);
        showDay(currentDateString);
      } else {
        document.querySelectorAll('.api__' + tabName).forEach(elem => {
          elem.style.display = 'none';
        });
      }

      /* filter-v3.js */
      let script = document.createElement("script");
      script.src = "https://wearemomentum.github.io/library/scripts/filter-v3.js";
      document.body.appendChild(script);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

})();