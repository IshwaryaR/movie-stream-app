import React, { useEffect } from "react";
import { Genre, GenresProps } from "../../Model/model";
import axios from "axios";
import { Chip } from "@mui/material";

const Genres = (props: GenresProps) => {
  const {
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
    page,
  } = props;
  const getGerresAPI = async () => {
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
    const { data } = await axios.get(genresUrl);
    setGenres(data.genres);
    setPage(data.total_pages);
  };
  useEffect(() => {
    getGerresAPI();
    return () => {
      setGenres([]);
    };
  }, []);

  const handleDelete = (genre: Genre) => {
    setSelectedGenres(
      selectedGenres.filter((gen: Genre) => gen.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  const handleClick = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((gen: Genre) => gen.id !== genre.id));
    setPage(1);
  };
  return (
    <>
      <div style={{ padding: "6px 0" }}>
        {selectedGenres.length > 0 &&
          selectedGenres.map((genre: Genre) => (
            <Chip
              color="primary"
              variant="outlined"
              style={{ margin: 2 }}
              size="small"
              key={genre.id}
              label={genre.name}
              onDelete={() => handleDelete(genre)}
            />
          ))}
        {genres.length > 0 &&
          genres.map((genre: Genre) => (
            <Chip
              color="secondary"
              variant="outlined"
              style={{ margin: 2 }}
              key={genre.id}
              label={genre.name}
              size="small"
              onClick={() => handleClick(genre)}
            />
          ))}
      </div>
    </>
  );
};

export default Genres;
