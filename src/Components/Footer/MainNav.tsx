import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/tvseries");
    else if (value === 3) navigate("/search");
  }, [value]);
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        backgroundColor: "2d313a",
        bottom: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          style={{ backgroundColor: "white" }}
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          label="Movies"
          style={{ backgroundColor: "white" }}
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          label="Tv Series"
          style={{ backgroundColor: "white" }}
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          label="Search"
          style={{ backgroundColor: "white" }}
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
