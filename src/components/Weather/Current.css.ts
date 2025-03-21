import { sunriseAnimation } from "./index.css";
import { style } from "@vanilla-extract/css";

const main = style({
    maxWidth: "600px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "10px",
    paddingInline: "10px",
    background: "#E1D2E3",
    boxShadow: "1px 1px 3px",
    overflow: "hidden",
});

const iconContainer = style({});

const icon = style({
    aspectRatio: "1 / 1",
    backgroundSize: "140%",
    width: "80px",
    backgroundPosition: "center",
    animationName: sunriseAnimation(150, 180, 0),
    animationDuration: "1s",
    animationTimingFunction: "ease-out",
});

const description = style({});

const locationContainer = style({
    alignItems: "center",
    textAlign: "center",
    textWrap: "balance",
    overflowWrap: "anywhere",
});

const firstName = style({
    fontSize: "2rem",
});

const secondName = style({});

const valueContainer = style({
    flexDirection: "column",
});

const block = style({
    minWidth: "100px",
    maxWidth: "200px",
    aspectRatio: "1 / 1",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    padding: "5px",
    boxSizing: "content-box",
});

const valueIcon = style({
    width: "1rem",
    backgroundSize: "contain",
    marginRight: "2px",
    verticalAlign: "middle",
});

const temperatureContainer = style({
    fontSize: "3.5rem",
});

const temperatureValue = style({});

const temperatureUnit = style({
    verticalAlign: "text-top",
    top: "1em",
    fontSize: "30%",
});

const subValueContainer = style({
    display: "flex",
    gap: "10px",
    width: "100%",
    justifyContent: "center",
});

const subValue = style({});

const subValueUnit = style({
    whiteSpace: "nowrap",
});

export { block, main, description, firstName, icon, iconContainer, locationContainer, secondName, subValue, subValueContainer, subValueUnit,
    temperatureContainer, temperatureUnit, temperatureValue, valueContainer, valueIcon };
