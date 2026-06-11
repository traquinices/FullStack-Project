package movies_api.client;

import movies_api.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// Client responsible for communicating with the TMDB public API
@Component
public class TmdbClient {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    // Search movies by query string
    public List<MovieDTO> searchMovies(String query) {
        String url = baseUrl + "/search/movie?api_key=" + apiKey + "&query=" + query + "&language=en-US";
        Map response = restTemplate.getForObject(url, Map.class);
        return parseMovies(response);
    }

    // Fetch currently popular movies
    public List<MovieDTO> getPopularMovies() {
        String url = baseUrl + "/movie/popular?api_key=" + apiKey + "&language=en-US";
        Map response = restTemplate.getForObject(url, Map.class);
        return parseMovies(response);
    }

    // Fetch full details for a specific movie by TMDB ID
    public MovieDTO getMovieDetails(Long tmdbId) {
        String url = baseUrl + "/movie/" + tmdbId + "?api_key=" + apiKey + "&language=en-US";
        Map movie = restTemplate.getForObject(url, Map.class);
        return parseMovie(movie);
    }

    // Parse a list of movie maps from the TMDB response
    private List<MovieDTO> parseMovies(Map response) {
        List<MovieDTO> movies = new ArrayList<>();
        if (response == null) return movies;

        List<Map> results = (List<Map>) response.get("results");
        if (results == null) return movies;

        for (Map movie : results) {
            movies.add(parseMovie(movie));
        }
        return movies;
    }

    // Map a raw TMDB movie map to a MovieDTO
    private MovieDTO parseMovie(Map movie) {
        MovieDTO dto = new MovieDTO();
        dto.setTmdbId(getLong(movie, "id"));
        dto.setTitle((String) movie.get("title"));
        dto.setOverview((String) movie.get("overview"));
        dto.setPosterPath((String) movie.get("poster_path"));
        dto.setReleaseDate((String) movie.get("release_date"));
        dto.setVoteAverage(getDouble(movie, "vote_average"));
        return dto;
    }

    // Safely extract a Long value from a map (handles Integer or Long)
    private Long getLong(Map map, String key) {
        Object val = map.get(key);
        if (val instanceof Integer) return ((Integer) val).longValue();
        if (val instanceof Long) return (Long) val;
        return null;
    }

    // Safely extract a Double value from a map (handles Double or Integer)
    private Double getDouble(Map map, String key) {
        Object val = map.get(key);
        if (val instanceof Double) return (Double) val;
        if (val instanceof Integer) return ((Integer) val).doubleValue();
        return null;
    }
}