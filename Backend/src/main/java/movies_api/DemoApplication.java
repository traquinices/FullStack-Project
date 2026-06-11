package movies_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	// http://localhost:8085/swagger-ui/index.html#/Movies/getMovieFromTmdb
	// inception 27205
	// The Dark Knight 155
	// Interstellar 157336
	// Avengers: Endgame 299534
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
