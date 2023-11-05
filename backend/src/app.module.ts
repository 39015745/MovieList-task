import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MovieListModule } from './MovieList/MoviesList.module';

@Module({
  imports: [AuthModule, MovieListModule],
  controllers: [],
})
export class AppModule {}
