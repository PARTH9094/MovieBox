const API_KEY = 'c61218e121489bd136616fe79500bf63';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const TOP_RATED_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const CAST_BASE_URL = `${BASE_URL}/person/popular?api_key=${API_KEY}`;
const BG_IMG_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
// https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg


// https://api.themoviedb.org/3/movie/now_playing

function getMovies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const moviesContainer = document.querySelector('.movies');
            moviesContainer.innerHTML = '';
            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                console.log(data)
                movieCard.innerHTML = `
                    <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <div>Release Date: ${movie.release_date}</div>
                    <div>Rating: ${movie.vote_average}</div>
                `;
                moviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function topRatedMovies() {
    fetch(TOP_RATED_URL).
        then(res => res.json()).
        then(data => {
            const topMovieContainer = document.querySelector('.top-rated-movies');
            topMovieContainer.innerHTML = '';
            data.results.forEach(movie => {
                const topMovie = document.createElement('div');
                topMovie.classList.add('movie-card');
                topMovie.innerHTML = `
                <img src = "${IMAGE_BASE_URL + movie.poster_path}">
                <h3>${movie.title}</h3>
                <div>Release Date: ${movie.release_date}</div>
                <div>Rating: ${movie.vote_average}</div>
            `;
            topMovieContainer.appendChild(topMovie);
            });
        })
        .catch(error =>{
            console.log('error',error);
        });
}

function getCasts() {
    fetch(CAST_BASE_URL)
        .then(res => res.json())
        .then(data => {
            const castContainer = document.querySelector('.casts');
            castContainer.innerHTML = '';
            data.results.forEach(member => {
                const castMember = document.createElement('div');
                castMember.classList.add('cast-member');
                castMember.innerHTML = `
                    <img src="${IMAGE_BASE_URL + member.profile_path}" alt="${member.name}">
                    <h4>${member.name}</h4>
                `;
                castContainer.appendChild(castMember);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function movieSliders() {
    fetch(BG_IMG_URL)
        .then(res => res.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomMovie = data.results[randomIndex];
            const backdropPath = randomMovie.backdrop_path;


            const header = document.getElementById('header');
            header.style.backgroundImage = `url(${IMAGE_BASE_URL + backdropPath}) `;
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
            header.style.opacity = 'rgba(0, 0, 0, 0.5)';


            document.querySelector('.movie-title').innerText = randomMovie.title;
            document.querySelector('.release-date').innerText = `Release Date: ${randomMovie.release_date}`;
            document.querySelector('.rating').innerText = `Rating: ${randomMovie.vote_average}`;
            document.querySelector('.description').innerText = `Description: ${randomMovie.overview}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

getMovies();
topRatedMovies()
getCasts();
movieSliders();
