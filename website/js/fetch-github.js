function fetchGitHub(local) {
  const starsEl = document.querySelector('.gh-stars span');
  const forksEl = document.querySelector('.gh-forks span');
  if (!starsEl) return;
  if (local) {
    const stars = localStorage.getItem('phenome-git-stats-stars')
    const forks = localStorage.getItem('phenome-git-stats-forks');
    if (stars) {
      starsEl.innerHTML = stars;
    }
    if (forks) {
      forksEl.innerHTML = forks
    }
    return;
  }
  window.fetchGitHubCallback = function(data) {
    localStorage.setItem('phenome-git-stats-date', new Date().getTime());
    if(data.data.stargazers_count){
      const stars = data.data.stargazers_count;
      localStorage.setItem('phenome-git-stats-stars', stars);
      starsEl.innerHTML = stars;
    }
    if(data.data.forks){
      const forks = data.data.forks_count;
      localStorage.setItem('phenome-git-stats-forks', forks);
      forksEl.innerHTML = forks;
    }
  }
  const script = document.createElement('script');
  document.head.appendChild(script);
  script.src = 'https://api.github.com/repos/phenomejs/phenome?callback=fetchGitHubCallback';
}


export default function () {
  const gitStatsDate = localStorage.getItem('phenome-git-stats-date');
  if (gitStatsDate && (new Date().getTime() - gitStatsDate * 1) < 1000 * 60 * 60) {
    fetchGitHub(true);
  }
  else {
    fetchGitHub();
  }
}