import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import SimpleBottomNavigation from "./Components/Footer/MainNav";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Movies from "./Components/Pages/Movies/Movies";
import TvSeries from "./Components/Pages/TvSeries/TvSeries";
import Trending from "./Components/Pages/Trending/Trending";
import Search from "./Components/Pages/Search/Search";
const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TvSeries />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
};

export default App;
