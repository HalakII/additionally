import { Movie } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";
import MoviesCard from "./MoviesCard";
import { MovieDetails, client } from "../../helpers/apiRequest";

import styles from "./Movies.module.scss";
import { useEffect, useState } from "react";

export function MoviesFetch() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    async function loadData() {
      const config = await client.getConfiguration();
      const imgUrl = config.images.base_url;
      const results = await client.getNowPlaying();

      const mappedResults: Movie[] = results.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        popularity: m.popularity,
        image: m.backdrop_path ? `${imgUrl}w780${m.backdrop_path}` : undefined,
      }));

      setMovies(mappedResults);
    }
    loadData();
  }, []);

  return <Movies movies={movies} />;
}

interface MoviesProps {
  movies: Movie[];
}
function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <div className={styles.list}>
        {movies.map(({ id, title, popularity, overview, image }) => (
          <MoviesCard
            key={id}
            id={id}
            title={title}
            overview={overview}
            popularity={popularity}
            image={image}
          />
        ))}
      </div>
    </section>
  );
}

const mapStanToProps = (state: RootState) => ({
  movies: state.movies.top,
});
const connector = connect(mapStanToProps);

export default connector(Movies);
