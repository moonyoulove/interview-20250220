import { classes as cx, stylesheet } from "typestyle";

const sx = stylesheet({
    display: "grid",
    position: "relative",
    overflow: "auto",
    $nest: {
        "thead, tbody": {
            display: "contents"
        },
        "thead > tr": {
            position: "sticky",
            top: "0",
            zIndex: "1"
        },
        "tbody > tr": {},
        "tr": {
            display: "grid",
            gridTemplateColumns: "subgrid",
            gridColumn: "1 / -1"
        }
    }
});

export default function Table({ className, style, children, numsCols }) {
    return (
        <table className={cx(sx.table, className)} style={{ ...style, gridTemplateColumns: `repeat(${numsCols}, max-content)` }}>
            {children}
        </table>
    );
}
