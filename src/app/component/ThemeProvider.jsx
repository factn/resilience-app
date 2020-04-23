import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { ThemeProvider } from "styled-components";

export default function ({ children, theme }) {
  const customTheme = createMuiTheme(theme);
  return (
    <>
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}
