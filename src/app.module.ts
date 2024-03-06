import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UsersController } from './models/users/users.controller';
import { ArtistsController } from './models/artists/artists.controller';
import { AlbumsController } from './models/albums/albums.controller';
import { TracksController } from './models/tracks/tracks.controller';
import { FavoritesController } from './models/favorites/favorites.controller';
import { FavoritesService } from './models/favorites/favorites.service';
import { AlbumsService } from './models/albums/albums.service';
import { ArtistsService } from './models/artists/artists.service';
import { UsersService } from './models/users/users.service';
import { AlbumsModule } from './models/albums/albums.module';
import { ArtistsModule } from './models/artists/artists.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { TracksModule } from './models/tracks/tracks.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ArtistsController,
    AlbumsController,
    TracksController,
    FavoritesController,
  ],
  providers: [FavoritesService, AlbumsService, ArtistsService, UsersService],
})
export class AppModule {}
