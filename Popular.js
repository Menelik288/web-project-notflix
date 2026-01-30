const API_KEY = "570c365f2777b7880f667f1542b69859";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

async function fetchmovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function loadpopular() {
displaymovies(await fetchmovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`), "upcoming-row");
displaymovies(await fetchmovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`), "nowplaying-row");
displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?sort_by=revenue.desc&api_key=${API_KEY}`), "popular-movie");
displaymovies(await fetchmovies(`${BASE_URL}/tv/popular?api_key=${API_KEY}`), "popular-tv", "tv");
}
    
async function displaymovies(movies, id, type="movie") {
    const row  = document.getElementById(id);
    if (!row) return;

    movies.forEach(items => {
        if(!items.poster_path){
            return;
        }
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `<img src="${IMAGE_BASE_URL}${items.poster_path}" alt="${items.title}">`

        card.addEventListener("click", () =>{
            if (type==="tv") {
                window.location.href = `Movie.html?id=${items.id}&type=tv`;
            } else {
                window.location.href = `Movie.html?id=${items.id}&type=movie`;
            }
        })

        row.appendChild(card);
    });
}   
const searchInput = document.getElementById("nav-search-input");
if (searchInput) {
    searchInput.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (!query) return;
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadpopular();
}); 