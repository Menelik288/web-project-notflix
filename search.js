
const usersearch = new URLSearchParams(window.location.search);
const query = usersearch.get("query");

async function search(query) {
    if (!query) return;
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();

    const filtered = data.results.filter(item =>
        item.media_type === "movie" || item.media_type === "tv"
    );

    displayResults(filtered);
}

function displayResults(results) {
    const row = document.getElementById("results-row");

    results.forEach(item => {
        if (!item.poster_path) return;

        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${IMAGE_BASE_URL}${item.poster_path}">
        `;

        card.onclick = () => {
            if (item.media_type === "tv") {
                window.location.href = `Movie.html?id=${item.id}&type=tv`;
            } else {
                window.location.href = `Movie.html?id=${item.id}&type=movie`;
            }
        };

        row.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    search(query);
});