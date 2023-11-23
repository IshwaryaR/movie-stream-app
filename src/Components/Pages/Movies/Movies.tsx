import axios from "axios";
import { useEffect, useState } from "react";
import { Content, Genre } from "../../../Model/model";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/Pagination";
import Genres from "../../Genres/Genres";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<Content[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState<any[]>([]);
  const genreIDS = selectedGenres.map((sel: Genre) => sel.id);
  const genreUrl = genreIDS.join(",");
  const fetchMoviesAPI = async () => {
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreUrl}`;
    const { data } = await axios.get(movieUrl);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMoviesAPI();
  }, [page, genreUrl]);
  return (
    <>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        page={page}
      />
      <div className="trending">
        {content &&
          content.map((con) => {
            const contentObj = {
              id: con.id,
              poster_path: con.poster_path,
              title: con.title || con.name,
              media_type: "movie",
              release_date: con.release_date,
              vote_average: con.vote_average,
            };
            return <SingleContent key={con.id} content={contentObj} />;
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  );
};

export default Movies;
