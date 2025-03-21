import { style } from "@vanilla-extract/css";

const main = style({
    display: "flex",
    gap: "5px",
});

const box = style({
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    fontFamily: "inherit",
    transition: "border-color 0.25s",
    flex: 1,
    width: "100%",
    ":hover": {
        borderColor: "#646cff",
    },
});

const submit = style({});

const icon = style({
    display: "inline-block",
    width: "1rem",
    aspectRatio: "1 / 1",
    backgroundSize: "contain",
});

const temperature = style({});

export { box, icon, main, submit, temperature };
