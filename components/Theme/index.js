import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Mikhak-VF",
    },
    pText: {
      fontSize: ".93rem",
    },
  },
  palette: {
    gray: {
      main: "rgb(0 0 0 / 20%)",
    },
  },
});

export default theme;
