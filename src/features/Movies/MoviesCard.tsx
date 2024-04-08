import { Link } from "react-router-dom";

import styles from "./MoviesCard.module.scss";

interface MovieCardProps {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

function MoviesCard({
  id,
  title,
  popularity,
  overview,
  image = "/movie-thumb.png",
}: MovieCardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src={image} alt="Moviesthumbnail" />
      <div className={styles.content}>
        <div>
          <Link to={`/movies/${id}`}>{title}</Link>
        </div>
        <div className={styles.overview}>{overview}</div>
        <div className={styles.popularity}>{popularity}</div>
      </div>
    </div>
  );
}

export default MoviesCard;
