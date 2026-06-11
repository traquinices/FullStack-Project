package movies_api.controller;

import movies_api.client.TmdbClient;
import movies_api.dto.MovieDTO;
import movies_api.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST controller exposing movie endpoints (local DB + TMDB integration)
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@Tag(name = "Movies", description = "CRUD operations and TMDB integration")
public class MovieController {

    private final MovieService movieService;
    private final TmdbClient tmdbClient;

    // --- Local database CRUD ---

    @GetMapping
    @Operation(summary = "List all saved movies")
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get movie by local ID")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PostMapping
    @Operation(summary = "Save a movie to the database")
    public ResponseEntity<MovieDTO> saveMovie(@RequestBody MovieDTO dto) {
        return ResponseEntity.ok(movieService.saveMovie(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a movie in the database")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable Long id, @RequestBody MovieDTO dto) {
        return ResponseEntity.ok(movieService.updateMovie(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a movie from the database")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    // --- Local search ---

    @GetMapping("/search")
    @Operation(summary = "Search movies saved in the local database")
    public ResponseEntity<List<MovieDTO>> searchLocal(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genres) {
        return ResponseEntity.ok(movieService.searchLocal(title, genres));
    }

    // --- TMDB public API ---

    @GetMapping("/tmdb/popular")
    @Operation(summary = "List popular movies from TMDB")
    public ResponseEntity<List<MovieDTO>> getPopularMovies() {
        return ResponseEntity.ok(tmdbClient.getPopularMovies());
    }

    @GetMapping("/tmdb/search")
    @Operation(summary = "Search movies on TMDB")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String query) {
        return ResponseEntity.ok(tmdbClient.searchMovies(query));
    }

    @GetMapping("/tmdb/{tmdbId}")
    @Operation(summary = "Get movie details from TMDB")
    public ResponseEntity<MovieDTO> getMovieFromTmdb(@PathVariable Long tmdbId) {
        return ResponseEntity.ok(tmdbClient.getMovieDetails(tmdbId));
    }

    @PostMapping("/tmdb/{tmdbId}/save")
    @Operation(summary = "Save a TMDB movie directly to the database")
    public ResponseEntity<MovieDTO> saveMovieFromTmdb(@PathVariable Long tmdbId) {
        return ResponseEntity.ok(movieService.saveMovieFromTmdb(tmdbId));
    }
}