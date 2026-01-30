const API_KEY = "570c365f2777b7880f667f1542b69859";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

async function fetchmovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

function displaymovies(movies, id) {
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
            window.location.href = `Movie.html?id=${items.id}`;
        })

        row.appendChild(card);
    });
}   

async function loadrows() {
    displaymovies(await fetchmovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`), "trending-row");
    displaymovies(await fetchmovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`), "toprated-row");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`), "action-row");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`), "comedy-row");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`), "horror-row");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`), "romance-row");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`), "sifi-row");
}

const searchInput = document.getElementById("nav-search-input");

if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (!query) return;
            
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadrows();
});