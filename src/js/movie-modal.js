'use strict';

import { addSpinner, removeSpinner } from './spinner';
import { moviesContainer } from './movies-list';

export function renderModal(movie) {
  const movieModal = document.querySelector('.movie-modal');
  const body = document.querySelector('body');

  movieModal.innerHTML = '';
  movieModal.classList.remove('is-hidden');
  const parsedGenres = movie.genres.map(genre => genre.name).join(', ');

  const markup = `<div class="movie-modal__content"><button type="button" class="movie-modal__close-btn">
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8L22 22" stroke="black" stroke-width="2"/>
<path d="M8 22L22 8" stroke="black" stroke-width="2"/>
</svg>
</button>
<div class="movie-modal__image-container">
  <img
    class="movie-modal__image"
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    alt="example image"
    loading="lazy"
  />
</div>
<div class="movie-modal__info-container">
  <div class="movie-modal__movie-info">
    <h2 class="movie-modal__movie-title">${movie.title}</h2>
    <div class="movie-modal__params">
    <div>
      <span class="movie-modal__movie-rating">Vote / Votes</span>
      <span class="movie-modal__rating-value">${movie.vote_average}</span>
      /
      <span class="movie-modal__rating-amount">${movie.vote_count}</span>
    </div>

    <div>
      <span class="movie-modal__movie-popularity">Popularity</span>
      <span clas="movie-modal__popularity-value">${movie.popularity}</span>
    </div>

    <div>
      <span class="movie-modal__movie-original-title"
        >Original Title</span
      >
      <span class="movie-modal__original-title-value"
        >${movie.original_title}</span
      >
    </div>

    <div>
      <span class="movie-modal__movie-genre">Genre</span>
      <span class="movie-modal__genre-value">${parsedGenres}</span>
    </div>
    </div>
    <div class="movie-modal__about-section">
      <h4>ABOUT</h4>
      <span class="movie-modal__movie-description">
        ${movie.overview}
      </span>
    </div>
  </div>
  <div class="movie-modal__buttons">
    <button type="button" class="watched-btn button">
      Add to watched
    </button>
    <button type="button" class="queue-btn button">Add to queue</button>
  </div>
</div>
  </div>`;

  movieModal.innerHTML = markup;

  const closeBtn = document.querySelector('.movie-modal__close-btn');

  closeBtn.addEventListener('click', () => {
    movieModal.classList.add('is-hidden');
  });

  body.addEventListener('click', () => {
    movieModal.classList.add('is-hidden');
  });

  document.addEventListener('keydown', function escapeKey(event) {
    if (event.key === 'Escape') {
      movieModal.classList.add('is-hidden');
      document.removeEventListener('keydown', escapeKey);
    }
  });

  // close modal by clicking on a background to be done
  // add to watched, add to queue function to be done

  const watchedBtn = document.querySelector('.watched-btn');
  const queueBtn = document.querySelector('.queue-btn');
}

function getMovieDetails(id) {
  fetchDetails(id).then(movieData => renderModal(movieData));
}

const fetchDetails = async movieId => {
  addSpinner();
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac2189c49864b4ab99e8ac3560f99981`
  );

  const videoDetails = await response.json();
  removeSpinner();
  return videoDetails;
};

moviesContainer.addEventListener('click', e => {
  if (e.target.className.includes('cover_')) {
    getMovieDetails(e.target.id);
  }
});