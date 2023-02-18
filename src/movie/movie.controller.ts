import { MovieService } from './movie.service';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { Movie } from './schemas/movie.schema';

import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';

@Controller('movie', 'Фильмы, сериалы, и т.д.')
export class MovieController extends BaseControllerWithFindById(Movie, MovieDocsResponseDto, 'Поиск тайтлов') {
  constructor(private readonly movieService: MovieService) {
    super(movieService);
  }
}
