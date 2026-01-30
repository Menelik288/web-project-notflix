const API_KEY = "570c365f2777b7880f667f1542b69859";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";


let heromovie = null;

async function fetchmovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function loadHeroMovie() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    const movies = data.results;

    heromovie = movies[Math.floor(Math.random() * movies.length)];

    document.getElementById("herobg").style.backgroundImage =
        `url(${IMAGE_BASE_URL}${heromovie.backdrop_path})`;

    document.getElementById("hero-title").textContent = heromovie.title;
    document.getElementById("hero-desc").textContent = heromovie.overview;
    document.getElementById("hero-rating").textContent = heromovie.vote_average.toFixed(1);

    document.getElementById("watch-btn").addEventListener("click", () => {
        window.location.href = `Movie.html?id=${heromovie.id}` ;
    });
}

async function loadrows() {
    const trending = await fetchmovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    displaymovies(trending, "trending-row");

    const tvshows = await fetchmovies(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    displaymovies(tvshows, "tv-row", "tv");

    const toprated = await fetchmovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    displaymovies(toprated, "toprated-row");

    const action = await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
    displaymovies(action, "action-row");

    const comedy = await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
    displaymovies(comedy, "comedy-row");

    const horror = await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
    displaymovies(horror, "horror-row");

    const romance = await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`);
    displaymovies(romance, "romance-row");

    const sciFi = await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`);
    displaymovies(sciFi, "sifi-row");
}

async function displaymovies(movies, id, type = "movie") {
    const row = document.getElementById(id);
    if (!row) return; 

    row.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
        `;

        card.addEventListener("click", () => {
            if (type === "tv") {
                window.location.href = `Movie.html?id=${movie.id}&type=tv`;
            } else {
                window.location.href = `Movie.html?id=${movie.id}`;
            }
        });

        row.appendChild(card);
    });
}
function displaycontwatch(list, id) {
    const row = document.getElementById(id);
    if (!row) return;
    row.innerHTML = "";

    list.forEach(item => {
        const poster = IMAGE_BASE_URL + item.poster;  
        const title = item.title;  
        const type = item.type;   

        const fakeProgress = Math.floor(Math.random() * 70) + 20;
        
        const card = document.createElement("div");
        card.classList.add("movie-card");

            card.innerHTML = `
            <img src="${poster}" alt="${title}">
            <div class="fake-progress-bar">
                <div class="fake-progress" style="width:${fakeProgress}%"></div>
            </div>
        `;


        card.addEventListener("click", () => {
            window.location.href = `Movie.html?id=${item.id}&type=${type}`;
        });

        row.appendChild(card);
    });
}
function loadcontwatch() {
    const list = JSON.parse(localStorage.getItem("contwatching")) || []
    displaycontwatch(list, "continue-row")
}

document.addEventListener("DOMContentLoaded", () => {
        loadHeroMovie();
        loadrows();
        loadcontwatch();

});

const searchInput = document.getElementById("nav-search-input");
if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (!query) return;
            
            window.location.href =
                `search.html?query=${encodeURIComponent(query)}`;
        }
    });
}