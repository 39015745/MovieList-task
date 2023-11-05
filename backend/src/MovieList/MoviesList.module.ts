import { Module } from '@nestjs/common';
import { MovieListController } from './MovieList.controller';
import { MovieListService } from './MovieList.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [MovieListController],
  providers: [MovieListService, AuthGuard],
})
export class MovieListModule {}
