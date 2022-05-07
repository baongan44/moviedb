import MovieGrid from "../../components/movie-grid/MovieGrid";
import PageHeader from "../../components/page-header/PageHeader";
import { category } from "../../api/api";

const Movies = () => {
  return (
    <>
      <PageHeader>
        Movies
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category.movie} />
        </div>
      </div>
    </>
  );
};

export default Movies;
