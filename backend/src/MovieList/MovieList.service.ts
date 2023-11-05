import { Injectable } from '@nestjs/common';

import { Movie } from './movie.model';

@Injectable()
export class MovieListService {
  private movies: Movie[] = [
    {
      id: '1',
      title: "Harry Potter and the Sorcerer's Stone",
      description:
        "A movie about a young wizard's journey into the magical world.",
      rating: 8.1,
    },
    {
      id: '2',
      title: 'The Shawshank Redemption',
      description: 'A story of hope and friendship in a prison setting.',
      rating: 9.3,
    },
    {
      id: '3',
      title: 'The Godfather',
      description: "A crime drama exploring the Corleone family's influence.",
      rating: 9.2,
    },
    {
      id: '4',
      title: 'The Dark Knight',
      description:
        "A superhero movie featuring Batman's battle against the Joker.",
      rating: 9.0,
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      description: 'A non-linear crime film with interconnected stories.',
      rating: 8.9,
    },
    {
      id: '6',
      title: 'Forrest Gump',
      description: "A heartwarming tale of a man's extraordinary life journey.",
      rating: 8.8,
    },
    {
      id: '7',
      title: 'Star Wars: Episode IV - A New Hope',
      description: 'A classic space opera set in a galaxy far, far away.',
      rating: 8.6,
    },
    {
      id: '8',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: "An epic fantasy adventure based on J.R.R. Tolkien's novel.",
      rating: 8.8,
    },
    {
      id: '9',
      title: 'Jurassic Park',
      description: 'A thrilling story of dinosaurs brought back to life.',
      rating: 8.1,
    },
    {
      id: '10',
      title: 'Titanic',
      description: 'A romantic drama set aboard the ill-fated RMS Titanic.',
      rating: 7.8,
    },
    {
      id: '11',
      title: 'Avatar',
      description:
        'A visually stunning science fiction adventure on the planet Pandora.',
      rating: 7.8,
    },
    {
      id: '12',
      title: 'Inception',
      description: 'A mind-bending thriller involving dreams and reality.',
      rating: 8.8,
    },
    {
      id: '13',
      title: 'The Matrix',
      description: 'A cyberpunk action film exploring the nature of reality.',
      rating: 8.7,
    },
    {
      id: '14',
      title: 'E.T. the Extra-Terrestrial',
      description: 'A heartwarming story of a boy and his alien friend.',
      rating: 7.8,
    },
    {
      id: '15',
      title: 'Gladiator',
      description: 'An epic historical drama set in ancient Rome.',
      rating: 8.5,
    },
  ];

  addMovie(title: string, description: string, rating: number) {
    const movieId = Math.random().toString();
    const newMovie = new Movie(movieId, title, description, rating);
    this.movies.push(newMovie);
    return movieId;
  }

  getAllMovies() {
    return [...this.movies];
  }
}
