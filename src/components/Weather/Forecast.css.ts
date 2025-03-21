import { sunriseAnimation } from "./index.css";
import { style } from "@vanilla-extract/css";

const forecast = style({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
});

const noListStyle = style({
    listStyleType: "none",
    padding: 0,
    margin: 0,
});

const temperatureContainer = style({});

const temperatureValue = style({});

const temperatureUnit = style({});

const icon = style({
    aspectRatio: "1 / 1",
    backgroundSize: "140%",
    width: "80px",
    backgroundPosition: "center",
    animationName: sunriseAnimation(100, 180, 0),
    animationDuration: "1s",
    animationTimingFunction: "ease-out",
});

const block = style({
    width: "150px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    gap: "3px",
    borderRadius: "10px",
    background: "#ADD8E6",
    boxShadow: "1px 1px 3px",
    overflow: "hidden",
});

export { block, forecast, icon, noListStyle, temperatureContainer, temperatureUnit, temperatureValue };
