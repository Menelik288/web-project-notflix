const API_KEY = "570c365f2777b7880f667f1542b69859";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

async function fetchmovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

function displaymovies(movies, id) {
    const row = document.getElementById(id);
    if (!row) return;

    row.innerHTML = "";

    movies.forEach(items => {
        if (!items.poster_path) return;

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${IMAGE_BASE_URL}${items.poster_path}" alt="${items.name}">
        `;

        card.addEventListener("click", () => {
            window.location.href = `Movie.html?id=${items.id}&type=tv`;
        });

        row.appendChild(card);
    });
}

async function loadTV() {
    displaymovies(await fetchmovies(`${BASE_URL}/tv/popular?api_key=${API_KEY}`), "tv-popular");
    displaymovies(await fetchmovies(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`), "tv-toprated");
    displaymovies(await fetchmovies(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`), "tv-trending");

    displaymovies(await fetchmovies(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`), "tv-action");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`), "tv-comedy");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`), "tv-crime");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`), "tv-animation");
    displaymovies(await fetchmovies(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`), "tv-drama");
}

document.addEventListener("DOMContentLoaded", loadTV);

// Search input
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