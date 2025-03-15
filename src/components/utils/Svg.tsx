interface SVGProps {
    href: string;
    width: number;
    height: number;
    x?: number;
    y?: number;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
}

export default function SVG({ href, width, height, x = 0, y = 0, className, style, ariaLabel }: SVGProps) {
    return (
        <svg className={className} style={style} viewBox={[x, y, width, height].join(" ")} aria-label={ariaLabel}>
            <use href={href + "#main"}></use>
        </svg>
    );
}
