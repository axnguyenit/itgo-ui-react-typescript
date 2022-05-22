import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      mode: string;
      common: {
        black: string;
        white: string;
      };
      primary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      info: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      success: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      warning: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      error: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      grey: {
        0: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        500_8: string;
        500_12: string;
        500_16: string;
        500_24: string;
        500_32: string;
        500_48: string;
        500_56: string;
        500_80: string;
      };
      chart: {
        violet: string;
        blue: string;
        green: string;
        yellow: string;
        red: string;
      };
      divider: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      background: {
        paper: string;
        default: string;
        neutral: string;
      };
      gradients: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        error: string;
      };
      action: {
        active: string;
        hover: string;
        hoverOpacity: number;
        selected: string;
        selectedOpacity: number;
        disabled: string;
        disabledBackground: string;
        disabledOpacity: number;
        focus: string;
        focusOpacity: number;
        activatedOpacity: number;
      };
    };
    customShadows: {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      card: string;
      dialog: string;
      dropdown: string;
    };
  }

  interface ThemeOptions {
    customShadows: {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      card: string;
      dialog: string;
      dropdown: string;
    };
  }
}
