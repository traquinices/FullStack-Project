package movies_api.repository;

import movies_api.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTmdbId(Long tmdbId);

    boolean existsByTmdbId(Long tmdbId);

    @Query("SELECT m FROM Movie m WHERE " +
            "(:title IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%', COALESCE(:title, ''), '%'))) AND " +
            "(:genres IS NULL OR LOWER(m.genres) LIKE LOWER(CONCAT('%', COALESCE(:genres, ''), '%')))")
    List<Movie> findByFilters(@Param("title") String title, @Param("genres") String genres);
}