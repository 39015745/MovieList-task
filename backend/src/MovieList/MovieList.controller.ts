import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import { MovieListService } from './MovieList.service';

@Controller('MovieList')
@UseGuards(AuthGuard)
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Post()
  addMovie(
    @Body('title') movieTitle: string,
    @Body('description') movieDescription: string,
    @Body('rating') movieRating: number,
  ) {
    const generatedId = this.movieListService.addMovie(
      movieTitle,
      movieDescription,
      movieRating,
    );
    return { id: generatedId };
  }

  @Get()
  getAllMovies() {
    return this.movieListService.getAllMovies();
  }
}
