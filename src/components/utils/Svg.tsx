interface SVGProps {
    href: string;
    width: number;
    height: number;
    x?: number;
    y?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function SVG({ href, width, height, x = 0, y = 0, className, style }: SVGProps) {
    return (
        <svg className={className} style={style} viewBox={[x, y, width, height].join(" ")}>
            <use href={href + "#main"}></use>
        </svg>
    );
}
