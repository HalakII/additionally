import { Movie } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface MoviesProps {
  movies: Movie[];
}
function Movies({ movies }: MoviesProps) {
  return (
    <div>
      <ul>
        {movies.map(({ id, title, popularity, overview }) => (
          <li key={id}>
            <div>{title}</div>
            <div>{popularity}</div>
            <div>{overview}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStanToProps = (state: RootState) => ({
  movies: state.movies.top,
});
const connector = connect(mapStanToProps);

export default connector(Movies);
