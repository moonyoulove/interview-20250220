import { keyframes } from "@vanilla-extract/css";

export const cardHorizAnimation = keyframes({
    "0%": { transform: "rotateX(180deg)", filter: "grayscale(0%)" },
    "30%": { filter: "grayscale(0%)" },
    "50%": { filter: "grayscale(100%)" },
    "100%": { transform: "rotateX(360deg)" },
});

export const cardVertAnimation = keyframes({
    "0%": { transform: "rotateY(180deg)", filter: "grayscale(0%)" },
    "30%": { filter: "grayscale(0%)" },
    "50%": { filter: "grayscale(100%)" },
    "100%": { transform: "rotateY(360deg)" },
});

export function sunriseAnimation(radius: number, startAngle: number, endAngle: number): string {
    return keyframes({
        "0%": { transform: `rotate(${startAngle}deg)`, transformOrigin: `center ${radius}px` },
        "100%": { transform: `rotate(${endAngle}deg)`, transformOrigin: `center ${radius}px` },
    });
}
