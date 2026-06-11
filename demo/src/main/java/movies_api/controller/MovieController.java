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

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@Tag(name = "Movies", description = "Operações CRUD e integração com TMDB")
public class MovieController {

    private final MovieService movieService;
    private final TmdbClient tmdbClient;

    //  CRUD (base de dados local)

    @GetMapping
    @Operation(summary = "Listar todos os filmes guardados")
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter filme por ID")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PostMapping
    @Operation(summary = "Guardar um filme na base de dados")
    public ResponseEntity<MovieDTO> saveMovie(@RequestBody MovieDTO dto) {
        return ResponseEntity.ok(movieService.saveMovie(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um filme na base de dados")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable Long id, @RequestBody MovieDTO dto) {
        return ResponseEntity.ok(movieService.updateMovie(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Apagar um filme da base de dados")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    //  Pesquisa local

    @GetMapping("/search")
    @Operation(summary = "Pesquisar filmes guardados na base de dados")
    public ResponseEntity<List<MovieDTO>> searchLocal(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genres) {
        return ResponseEntity.ok(movieService.searchLocal(title, genres));
    }

    //  TMDB (API pública)

    @GetMapping("/tmdb/popular")
    @Operation(summary = "Listar filmes populares da TMDB")
    public ResponseEntity<List<MovieDTO>> getPopularMovies() {
        return ResponseEntity.ok(tmdbClient.getPopularMovies());
    }

    @GetMapping("/tmdb/search")
    @Operation(summary = "Pesquisar filmes na TMDB")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String query) {
        return ResponseEntity.ok(tmdbClient.searchMovies(query));
    }

    @GetMapping("/tmdb/{tmdbId}")
    @Operation(summary = "Obter detalhes de um filme da TMDB")
    public ResponseEntity<MovieDTO> getMovieFromTmdb(@PathVariable Long tmdbId) {
        return ResponseEntity.ok(tmdbClient.getMovieDetails(tmdbId));
    }

    @PostMapping("/tmdb/{tmdbId}/save")
    @Operation(summary = "Guardar filme da TMDB diretamente na base de dados")
    public ResponseEntity<MovieDTO> saveMovieFromTmdb(@PathVariable Long tmdbId) {
        return ResponseEntity.ok(movieService.saveMovieFromTmdb(tmdbId));
    }
}