package movies_api.service;

import movies_api.client.TmdbClient;
import movies_api.dto.MovieDTO;
import movies_api.model.Movie;
import movies_api.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Service layer handling business logic for movie operations
@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final TmdbClient tmdbClient;

    // Return all movies stored in the database
    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Find a single movie by its local database ID
    public MovieDTO getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
        return toDTO(movie);
    }

    // Persist a new movie from a DTO
    public MovieDTO saveMovie(MovieDTO dto) {
        Movie movie = toEntity(dto);
        return toDTO(movieRepository.save(movie));
    }

    // Update an existing movie's fields by local ID
    public MovieDTO updateMovie(Long id, MovieDTO dto) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
        movie.setTitle(dto.getTitle());
        movie.setOverview(dto.getOverview());
        movie.setPosterPath(dto.getPosterPath());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setVoteAverage(dto.getVoteAverage());
        movie.setGenres(dto.getGenres());
        return toDTO(movieRepository.save(movie));
    }

    // Delete a movie by local ID, throwing if not found
    public void deleteMovie(Long id) {
        movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
        movieRepository.deleteById(id);
    }

    // Fetch a movie from TMDB and save it locally (rejects duplicates)
    public MovieDTO saveMovieFromTmdb(Long tmdbId) {
        if (movieRepository.existsByTmdbId(tmdbId)) {
            throw new IllegalArgumentException("Movie with tmdbId " + tmdbId + " already exists in the database");
        }
        MovieDTO dto = tmdbClient.getMovieDetails(tmdbId);
        return toDTO(movieRepository.save(toEntity(dto)));
    }

    // Filter movies by title and/or genre using the repository query
    public List<MovieDTO> searchLocal(String title, String genres) {
        return movieRepository.findByFilters(title, genres)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Convert a Movie entity to a MovieDTO
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

    // Convert a MovieDTO to a Movie entity
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