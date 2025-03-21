import { globalStyle } from "@vanilla-extract/css";

globalStyle("#root", {
    maxWidth: "1280px",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    boxSizing: "border-box"
});
