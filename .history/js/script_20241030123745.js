document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

let moviesData = [];  // Aquí almacenaremos los datos de las películas

function fetchMovies() {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            moviesData = data;
        })
        .catch(error => console.error("Error al obtener datos de la API:", error));
}
