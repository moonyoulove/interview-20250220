import { style } from "@vanilla-extract/css";

const table = style({
    display: "grid",
    position: "relative",
    overflow: "auto",
    selectors: {
        "thead, tbody": {
            display: "contents",
        },
        "thead > tr": {
            position: "sticky",
            top: "0",
            zIndex: "1",
        },
        "tbody > tr": {},
        "tr": {
            display: "grid",
            gridTemplateColumns: "subgrid",
            gridColumn: "1 / -1",
        },
    },
});

export { table };
