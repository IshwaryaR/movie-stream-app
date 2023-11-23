import {
  Button,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { setSourceMapRange } from "typescript";
import { Content } from "../../../Model/model";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/Pagination";
const Search = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("movie");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<Content[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setType(value);
    setPage(1);
  };

  const fetchSearchAPI = async () => {
    const searchUrl = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${page}`;
    const { data } = await axios.get(searchUrl);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearchAPI();
  }, [page, type]);
  return (
    <div>
      <span className="pageTitle">Search</span>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={() => fetchSearchAPI()}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          onChange={(event, value) => handleChange(event, value)}
          textColor="primary"
          indicatorColor="primary"
          style={{ paddingBottom: 5 }}
        >
          <Tab value="movie" style={{ width: "50%" }} label="Search Movies" />
          <Tab value="tv" style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((con) => {
            const contentObj = {
              poster_path: con.poster_path,
              title: con.title || con.name,
              media_type: type,
              release_date: con.release_date,
              vote_average: con.vote_average,
              id: con.id,
            };
            return <SingleContent key={con.id} content={contentObj} />;
          })}
      </div>
      {searchText && !content && <h2>No Results Found</h2>}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
