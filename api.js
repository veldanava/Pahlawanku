// Function consume API
// API yang digunakan adalah terbuka jadi bisa digunakan dengan legal
// API data pahlawan dan API wikipedia untuk mengambil data gambar pahlawan

document.getElementById('searchButton').addEventListener('click', function() {
  const heroName = document.getElementById('searchInput').value.trim().toLowerCase();
  if (heroName) {
      fetch(`https://indonesia-public-static-api.vercel.app/api/heroes`) // API Data pahlawan
          .then(response => response.json())
          .then(data => {
              const hero = data.find(h => h.name.toLowerCase() === heroName);
              if (hero) {
                  displayHeroInfo(hero);
                  fetchWikipediaImage(hero.name);
              } else {
                  alert('Hero not found'); // alert ketika data pahlawan tidak ditemukan
                  clearHeroInfo();
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  } else {
      alert('Please enter a hero name');
  }
});

// function untuk menampilkan data static pahlawan
function displayHeroInfo(hero) {
  document.getElementById('heroName').textContent = hero.name;
  document.getElementById('heroBirthDate').textContent = `Birth Date: ${hero.birth_year}`;
  document.getElementById('heroDeathDate').textContent = `Death Date: ${hero.death_year}`;
  document.getElementById('heroDescription').textContent = hero.description;
  document.getElementById('heroInfo').classList.remove('hidden');
}

// function untuk membesihkan list data static
function clearHeroInfo() {
  document.getElementById('heroName').textContent = '';
  document.getElementById('heroBirthDate').textContent = '';
  document.getElementById('heroDeathDate').textContent = '';
  document.getElementById('heroDescription').textContent = '';
  document.getElementById('heroImage').src = '';
  document.getElementById('heroInfo').classList.add('hidden');
}

function fetchWikipediaImage(heroName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages&titles=${encodeURIComponent(heroName)}&piprop=thumbnail&pithumbsize=500`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const pages = data.query.pages;
          const page = Object.values(pages)[0];
          if (page && page.thumbnail && page.thumbnail.source) {
              document.getElementById('heroImage').src = page.thumbnail.source;
          } else {
              document.getElementById('heroImage').src = '';
          }
      })
      .catch(error => {
          console.error('Error fetching image:', error);
          document.getElementById('heroImage').src = '';
      });
}
