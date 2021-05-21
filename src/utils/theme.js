export const themeConfig = {
  palette: {
    primary: {
      light: "#457b9d",
      main: "#1d3557",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#e63946",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  generalStyles: {
    container: {
      textAlign: "center",
    },
    logo: {
      height: 50,
      margin: "20px auto",
    },
    title: {
      margin: "10px auto",
    },
    textField: {
      margin: "10px auto",
    },
    button: {
      marginTop: 25,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    loader: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
      position: "relative",
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 100,
        height: 100,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, p, svg,": {
          verticalAlign: "middle",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};
