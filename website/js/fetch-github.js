import $ from 'jquery';

function fetchGitStats(local) {
  if (local) {
    if (localStorage.getItem('phenome-git-stats-stars')) {
      $('.gh-stars span').html(localStorage.getItem('phenome-git-stats-stars'));
    }
    if (localStorage.getItem('phenome-git-stats-forks')) {
      $('.gh-forks span').html(localStorage.getItem('phenome-git-stats-forks'));
    }
    return;
  }
  $.ajax({
    dataType: 'jsonp',
    url: 'https://api.github.com/repos/phenomejs/phenome',
    success: function(data){
      if (data) {
        localStorage.setItem('phenome-git-stats-date', new Date().getTime());
        if(data.data.stargazers_count){
          var stars = data.data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          localStorage.setItem('phenome-git-stats-stars', stars);
          $('.gh-stars span').html(stars);
        }
        if(data.data.forks){
          var forks = data.data.forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          localStorage.setItem('phenome-git-stats-forks', forks);
          $('.gh-forks span').html(forks);
        }
      }
    }
  });
}


export default function () {
  const gitStatsDate = localStorage.getItem('phenome-git-stats-date');
  if (gitStatsDate && (new Date().getTime() - gitStatsDate * 1) < 1000 * 60 * 60) {
    fetchGitStats(true);
  }
  else {
    fetchGitStats();
  }
}