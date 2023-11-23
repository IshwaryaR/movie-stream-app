import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import { Content } from "../../../Model/model";
import "./Trending.css";
import "../../../App.css";
import CustomPagination from "../../Pagination/Pagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<Content[]>([]);

  const fetchTrendingAPI = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
    const { data } = await axios.get(url);
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrendingAPI();
  }, [page]);
  return (
    <>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((con) => {
            const contentObj = {
              poster_path: con.poster_path,
              title: con.title || con.name,
              media_type: con.media_type,
              release_date: con.release_date,
              vote_average: con.vote_average,
              id: con.id,
            };
            return <SingleContent key={con.id} content={contentObj} />;
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
