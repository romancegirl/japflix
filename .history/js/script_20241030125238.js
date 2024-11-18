document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

let moviesData = [];

async function fetchMovies() {
    try {
        const response = await fetch("https://japceibal.github.io/japflix_api/movies-data.json");
        moviesData = await response.json();
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
    }
}

document.getElementById("btnBuscar").addEventListener("click", () => {
    const searchTerm = document.getElementById("inputBuscar").value.toLowerCase();
    if (searchTerm) {
        const results = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genres.some(genre => typeof genre === "string" && genre.toLowerCase().includes(searchTerm)) ||
            (movie.tagline && movie.tagline.toLowerCase().includes(searchTerm)) ||
            (movie.overview && movie.overview.toLowerCase().includes(searchTerm))
        );
        displayMovies(results);
    }
});

function displayMovies(movies) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";  // Limpiamos la lista antes de agregar resultados

    movies.forEach(movie => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item bg-dark text-white";
        listItem.innerHTML = `
            <h5>${movie.title}</h5>
            <p>${movie.tagline}</p>
            <div>${renderStars(movie.vote_average)}</div>
        `;
        listItem.addEventListener("click", () => showMovieDetails(movie));
        lista.appendChild(listItem);
    });
}

function renderStars(vote) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="fa fa-star ${i <= vote / 2 ? "checked" : ""}"></span>`;
    }
    return stars;
}

function showMovieDetails(movie) {
    document.getElementById("movieTitle").textContent = movie.title;
    document.getElementById("movieOverview").textContent = movie.overview;
    document.getElementById("movieGenres").textContent = movie.genres.join(", ");
    document.getElementById("movieYear").textContent = new Date(movie.release_date).getFullYear();
    document.getElementById("movieDuration").textContent = movie.runtime;
    document.getElementById("movieBudget").textContent = movie.budget.toLocaleString();
    document.getElementById("movieRevenue").textContent = movie.revenue.toLocaleString();

    const offcanvas = new bootstrap.Offcanvas(document.getElementById("movieDetails"));
    offcanvas.show();
}
