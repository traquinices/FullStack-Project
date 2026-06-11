package movies_api.dto;

import lombok.Data;

@Data
public class MovieDTO {
    private Long id;
    private Long tmdbId;
    private String title;
    private String overview;
    private String posterPath;
    private String releaseDate;
    private Double voteAverage;
    private String genres;
}