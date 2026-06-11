package movies_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tmdbId;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(length = 500)
    private String posterPath;

    private String releaseDate;
    private Double voteAverage;
    private String genres;
}