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

document.getElementById("btnBuscar").addEventListener("click", () => searchMovies());

document.getElementById("inputBuscar").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchMovies();
    }
});

function searchMovies() {
    const searchTerm = document.getElementById("inputBuscar").value.toLowerCase();
    if (searchTerm) {
        const results = moviesData.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genres.some(genre => genre.name.toLowerCase().includes(searchTerm)) ||
            (movie.tagline && movie.tagline.toLowerCase().includes(searchTerm)) ||
            (movie.overview && movie.overview.toLowerCase().includes(searchTerm))
        );
        displayMovies(results);
    }
}

function displayMovies(movies) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (movies.length === 0) {
        const noResultsMessage = document.createElement("li");
        noResultsMessage.className = "list-group-item bg-dark text-white text-center";
        noResultsMessage.innerHTML = `
            <h3><strong>¡Ups! No hemos encontrado ninguna película. ¡Vuelve a intentarlo!</strong></h3>
        `;
        lista.appendChild(noResultsMessage);
    } else {
        movies.forEach(movie => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item bg-dark text-white";
            listItem.innerHTML = `
                <h5>${movie.title}</h5>
                <div class="d-flex justify-content-between align-items-center">
                    <p><i>${movie.tagline}</i></p>
                    <div>${renderStars(movie.vote_average)}</div>
                </div>
            `;
            listItem.addEventListener("click", () => showMovieDetails(movie));
            lista.appendChild(listItem);
        });
    }
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
    document.getElementById("movieGenres").textContent = movie.genres.map(genre => genre.name).join(", ");
    document.getElementById("movieYear").textContent = new Date(movie.release_date).getFullYear();
    document.getElementById("movieDuration").textContent = movie.runtime;
    document.getElementById("movieBudget").textContent = movie.budget.toLocaleString();
    document.getElementById("movieRevenue").textContent = movie.revenue.toLocaleString();

    const offcanvas = new bootstrap.Offcanvas(document.getElementById("movieDetails"));
    offcanvas.show();
}
