
import Spinner from '../Spinner';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const MoviesSection = ({
  id,
  title,
  movies,
  isLoading,
  error,
  noDataMessage = "No movies available.",
  currentPage,    
  totalPages,     
  onPageChange,   
  sectionClassName = "all-movies mt-20"
}) => {
  return (
    <section id={id} className={sectionClassName}>
      <h2 className="text-gradient">{title}</h2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : movies && movies.length > 0 ? (
        <>
          <ul>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
          {typeof currentPage !== 'undefined' &&
            typeof totalPages !== 'undefined' &&
            onPageChange && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
        </>
      ) : (
        <p>{noDataMessage}</p>
      )}
    </section>
  );
};

export default MoviesSection;
