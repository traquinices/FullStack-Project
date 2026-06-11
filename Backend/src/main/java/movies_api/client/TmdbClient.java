package movies_api.client;

import movies_api.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class TmdbClient {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<MovieDTO> searchMovies(String query) {
        String url = baseUrl + "/search/movie?api_key=" + apiKey + "&query=" + query + "&language=pt-PT";
        Map response = restTemplate.getForObject(url, Map.class);
        return parseMovies(response);
    }

    public List<MovieDTO> getPopularMovies() {
        String url = baseUrl + "/movie/popular?api_key=" + apiKey + "&language=pt-PT";
        Map response = restTemplate.getForObject(url, Map.class);
        return parseMovies(response);
    }

    public MovieDTO getMovieDetails(Long tmdbId) {
        String url = baseUrl + "/movie/" + tmdbId + "?api_key=" + apiKey + "&language=pt-PT";
        Map movie = restTemplate.getForObject(url, Map.class);
        return parseMovie(movie);
    }

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

    private Long getLong(Map map, String key) {
        Object val = map.get(key);
        if (val instanceof Integer) return ((Integer) val).longValue();
        if (val instanceof Long) return (Long) val;
        return null;
    }

    private Double getDouble(Map map, String key) {
        Object val = map.get(key);
        if (val instanceof Double) return (Double) val;
        if (val instanceof Integer) return ((Integer) val).doubleValue();
        return null;
    }
}