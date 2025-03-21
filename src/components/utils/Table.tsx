import * as sx from "./Table.css";
import cx from "clsx/lite";

interface TableProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    numsCols: number;
}

export default function Table({ className = "", style, children, numsCols }: TableProps) {
    return (
        <table className={cx(sx.table, className)} style={{ ...style, gridTemplateColumns: `repeat(${numsCols}, max-content)` }}>
            {children}
        </table>
    );
}
