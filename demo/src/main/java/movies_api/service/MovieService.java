package movies_api.service;

import movies_api.client.TmdbClient;
import movies_api.dto.MovieDTO;
import movies_api.model.Movie;
import movies_api.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final TmdbClient tmdbClient;

    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado com id: " + id));
        return toDTO(movie);
    }

    public MovieDTO saveMovie(MovieDTO dto) {
        Movie movie = toEntity(dto);
        return toDTO(movieRepository.save(movie));
    }

    public MovieDTO updateMovie(Long id, MovieDTO dto) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado com id: " + id));
        movie.setTitle(dto.getTitle());
        movie.setOverview(dto.getOverview());
        movie.setPosterPath(dto.getPosterPath());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setVoteAverage(dto.getVoteAverage());
        movie.setGenres(dto.getGenres());
        return toDTO(movieRepository.save(movie));
    }

    public void deleteMovie(Long id) {
        movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado com id: " + id));
        movieRepository.deleteById(id);
    }

    public MovieDTO saveMovieFromTmdb(Long tmdbId) {
        if (movieRepository.existsByTmdbId(tmdbId)) {
            throw new IllegalArgumentException("Filme com tmdbId " + tmdbId + " já existe na base de dados");
        }
        MovieDTO dto = tmdbClient.getMovieDetails(tmdbId);
        return toDTO(movieRepository.save(toEntity(dto)));
    }

    public List<MovieDTO> searchLocal(String title, String genres) {
        return movieRepository.findByFilters(title, genres)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private MovieDTO toDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTmdbId(movie.getTmdbId());
        dto.setTitle(movie.getTitle());
        dto.setOverview(movie.getOverview());
        dto.setPosterPath(movie.getPosterPath());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setVoteAverage(movie.getVoteAverage());
        dto.setGenres(movie.getGenres());
        return dto;
    }

    private Movie toEntity(MovieDTO dto) {
        Movie movie = new Movie();
        movie.setTmdbId(dto.getTmdbId());
        movie.setTitle(dto.getTitle());
        movie.setOverview(dto.getOverview());
        movie.setPosterPath(dto.getPosterPath());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setVoteAverage(dto.getVoteAverage());
        movie.setGenres(dto.getGenres());
        return movie;
    }
}