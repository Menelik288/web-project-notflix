const API_KEY = "570c365f2777b7880f667f1542b69859";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type") || "movie";

const seasonSelect = document.getElementById("season-select");
const episodeSelect = document.getElementById("episode-select");
const tvControls = document.getElementById("tv-controls");


async function fetchDetails() {
    const listbtn = document.getElementById("list-btn");
    const url = type === "tv"
        ? `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
        : `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    document.getElementById("details-bg").style.backgroundImage =
        `url(${IMAGE_BASE_URL}${data.backdrop_path})`;

    document.getElementById("details-poster").src =
        `${IMAGE_BASE_URL}${data.poster_path}`;

    document.getElementById("details-title").textContent =
        type === "tv" ? data.name : data.title;

    document.getElementById("details-overview").textContent = data.overview;

    document.getElementById("genre").textContent =
    data.genres.map(g => g.name).join(", ");

    document.getElementById("details-rating").textContent = data.vote_average.toFixed(1);

    document.getElementById("details-date").textContent =
        type === "tv" ? data.first_air_date : data.release_date;

    if (type === "tv") {
        tvControls.classList.remove("hidden");
        await loadSeasons(id);
    }

    document.getElementById("watch-btn").onclick = () => {
        contwatching(id, type, data);
        if (type === "tv") {
            const selectedSeason = seasonSelect.value;
            const selectedEpisode = episodeSelect.value;
            Watchvideo(id, "tv", selectedSeason, selectedEpisode);
        } else {
            Watchvideo(id, "movie");
        }
    };


const item = {
    id: id,
    type: type,
    title: type==="tv" ? data.name : data.title,
    poster: data.poster_path
}
let mylist = JSON.parse(localStorage.getItem("mylist"))||[];
const exists = mylist.find(i=> i.id == id && i.type == type && i.title == item.title);
if (exists) {
    listbtn.textContent = `Added ✅`;
}
listbtn.onclick = ()=>{
    let list = JSON.parse(localStorage.getItem("mylist")) || [];
    let index = list.findIndex(i => i.id == id && i.type == type && i.title == item.title);
    if (index === -1) {
        list.push(item);
        listbtn.textContent = `Added ✅`;
    }
    else{
        list.splice(index, 1);
        listbtn.textContent = `+ My List`;
    }
    localStorage.setItem("mylist", JSON.stringify(list));
}

}

async function loadSeasons(tvId) {
    const res = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`);
    const data = await res.json();

    seasonSelect.innerHTML = "";

    data.seasons.forEach(season => {
        if (season.season_number === 0) return; 

        const option = document.createElement("option");
        option.value = season.season_number;
        option.textContent = `Season ${season.season_number}`;
        seasonSelect.appendChild(option);
    });

    loadEpisodes(tvId, seasonSelect.value);

    seasonSelect.onchange = () => {
        loadEpisodes(tvId, seasonSelect.value);
    };
}

async function loadEpisodes(tvId, season) {
    const res = await fetch(`${BASE_URL}/tv/${tvId}/season/${season}?api_key=${API_KEY}`);
    const data = await res.json();

    episodeSelect.innerHTML = "";

    data.episodes.forEach(ep => {
        const option = document.createElement("option");
        option.value = ep.episode_number;
        option.textContent = `Episode ${ep.episode_number}: ${ep.name}`;
        episodeSelect.appendChild(option);
    });
}
function Watchvideo(id, type = "movie", season = 1, episode = 1) {
    let url = type === "movie"
        ? `https://vidsrc.icu/embed/movie/${id}`
        : `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;

    const preview = document.getElementById("video-preview");
    const iframe = document.getElementById("preview-frame");

    iframe.src = url;
    preview.classList.remove("hidden");
    preview.scrollIntoView({ behavior: "smooth" });
}
async function loadtrailer(id, type = "movie") {

    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos`;

    const res = await fetch(url);
    const data = await res.json();

    const trailer = data.videos?.results?.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailer) {
        alert("No trailer available.");
        return;
    }

    const section = document.getElementById("video-preview");
    const iframe = document.getElementById("preview-frame");

    iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

    section.classList.remove("hidden");
    section.scrollIntoView({ behavior: "smooth" });
}
function contwatching(id, type, data) {
    let list = JSON.parse(localStorage.getItem("contwatching")) || [];

    const exists = list.find(i => i.id === id && i.type === type);

    if (exists) return;

    list = list.filter(i => i.id !== id);

    list.unshift({
        id: id,
        type: type,  
        title: type === "tv" ? data.name : data.title,
        poster: data.poster_path
    });

    localStorage.setItem("contwatching", JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("trailer-btn");
    if (btn) {
        btn.addEventListener("click", () => loadtrailer(id, type));
    }
});
document.addEventListener("DOMContentLoaded", fetchDetails);