import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    pwc: {
      primary: Palette["primary"];
      secondary: Palette["primary"];
    };
  }
  interface PaletteOptions {
    pwc: {
      primary: PaletteOptions["primary"];
      secondary: PaletteOptions["primary"];
    };
  }
}
