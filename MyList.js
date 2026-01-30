const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function loadlist() {
    const row = document.getElementById("mylist-row");
    const list = JSON.parse(localStorage.getItem("mylist")) || [];

    if (list.length === 0) {
        row.innerHTML = "<p style=\"color: red;\">Looks like your list is empty!</p>"
    }
    list.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
        <img src="${IMAGE_BASE_URL}${item.poster}" alt="${item.title}"/>`

        card.onclick = () =>{
            window.location.href = `Movie.html?id=${item.id}&type=${item.type}`;
        }
        row.appendChild(card);
    });
    
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
document.addEventListener("DOMContentLoaded", loadlist);