import { Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";
import { CustomPaginationProps } from "../../Model/model";

const CustomPagination = (props: CustomPaginationProps) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { setPage, numOfPages = 10 } = props;
  const paginationClick = (page: number) => {
    setPage(page);
    //window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          color="primary"
          count={numOfPages}
          onChange={(e) =>
            paginationClick(Number((e.target as HTMLElement).textContent))
          }
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
