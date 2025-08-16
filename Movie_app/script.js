const movies = [
  {
    id:1,
    title:"Red Midnight",
    genre:["Action","Thriller"],
    desc:"A former spy returns to stop a cyber-weapon from destroying cities.",
    rating:8.2,
    img:"https://picsum.photos/seed/m1/600/900"
  },
  {
    id:2,
    title:"Sunny Days",
    genre:["Drama","Romance"],
    desc:"Two strangers meet in a seaside town and change each other's lives.",
    rating:7.4,
    img:"https://picsum.photos/seed/m2/600/900"
  },
  {
    id:3,
    title:"The Last Algorithm",
    genre:["Sci-Fi"],
    desc:"An engineer finds an algorithm that can predict human choices.",
    rating:8.8,
    img:"https://picsum.photos/seed/m3/600/900"
  },
  {
    id:4,
    title:"House of Clocks",
    genre:["Horror","Mystery"],
    desc:"A family trapped in a house where time behaves strangely.",
    rating:7.0,
    img:"https://picsum.photos/seed/m4/600/900"
  },
  {
    id:5,
    title:"Cooking Up Storms",
    genre:["Comedy"],
    desc:"A chaotic cooking show competition with surprisingly warm hearts.",
    rating:6.9,
    img:"https://picsum.photos/seed/m5/600/900"
  }
];

const moviesEl = document.getElementById('movies');
const search = document.getElementById('search');
const genreFilter = document.getElementById('genreFilter');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');
const modalGenre = document.getElementById('modalGenre');
const modalRating = document.getElementById('modalRating');

function getAllGenres(){
  const g = new Set();
  movies.forEach(m => m.genre.forEach(gg => g.add(gg)));
  return ['all', ...[...g]];
}

function renderMovies(list){
  moviesEl.innerHTML = '';
  if(list.length === 0){
    moviesEl.innerHTML = '<p style="color:var(--muted);padding:20px">No movies found.</p>';
    return;
  }
  list.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="poster" src="${m.img}" alt="${m.title}">
      <div class="card-body">
        <h3 class="title">${m.title}</h3>
        <div class="meta">${m.genre.join(', ')} • ⭐ ${m.rating}</div>
        <p class="desc">${m.desc}</p>
        <span class="badge">Watch</span>
      </div>
    `;
    card.onclick = () => openModal(m);
    moviesEl.appendChild(card);
  });
}

function openModal(m){
  modalTitle.textContent = m.title;
  modalImg.src = m.img;
  modalDesc.textContent = m.desc;
  modalGenre.textContent = 'Genre: ' + m.genre.join(', ');
  modalRating.textContent = m.rating;
  modal.classList.remove('hidden');
}

closeModal.onclick = ()=> modal.classList.add('hidden');
modal.onclick = (e) => { if(e.target === modal) modal.classList.add('hidden') };

search.addEventListener('input', ()=> applyFilters());
genreFilter.addEventListener('change', ()=> applyFilters());

function applyFilters(){
  const q = search.value.trim().toLowerCase();
  const g = genreFilter.value;
  const filtered = movies.filter(m => {
    const matchQ = m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q) || m.genre.join(' ').toLowerCase().includes(q);
    const matchG = (g === 'all') || m.genre.includes(g);
    return matchQ && matchG;
  });
  renderMovies(filtered);
}

/* init */
(function init(){
  getAllGenres().forEach(gg => {
    const opt = document.createElement('option');
    opt.value = gg;
    opt.textContent = gg.charAt(0).toUpperCase() + gg.slice(1);
    genreFilter.appendChild(opt);
  });
  renderMovies(movies);
})();