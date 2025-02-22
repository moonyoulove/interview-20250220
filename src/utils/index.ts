import { customAlphabet } from "nanoid/non-secure";
import { useCallback, useEffect, useRef } from "react";

export class Theme {
    prefix;
    context: Record<string, string> = {};
    static hash = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 7);

    constructor(prefix: string) {
        this.prefix = prefix ? `--${prefix}-` : "--";
    }

    get(name: string, fallbacks: string[] | null = null) {
        const varName = this.context[name] ??= `${this.prefix}${name}_${Theme.hash()}`;
        if (Array.isArray(fallbacks)) {
            return `var(${[varName, ...fallbacks].join(", ")})`;
        } else {
            return varName;
        }
    }

    setValue(name: string, value: string, priority: string = "", selector: string = ":root") {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        const varName = this.get(name);
        (element as HTMLElement).style.setProperty(varName, value, priority);
    }

    update(valueMap: Record<string, string[]> | Record<string, string>, selector = ":root") {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        for (const name in valueMap) {
            let value, priority;
            if (Array.isArray(valueMap[name])) {
                [value, priority = ""] = valueMap[name];
            } else {
                value = valueMap[name];
                priority = "";
            }
            const varName = this.get(name);
            (element as HTMLElement).style.setProperty(varName, value, priority);
        }
    }

    getValue(name: string, selector = ":root") {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        return getComputedStyle(element).getPropertyValue(this.get(name));
    }

    forgot(name: string) {
        delete this.context[name];
    }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any;

export function useThrottle<T extends Callback>(callback: T, delay: number = 100) {
    const timer = useRef(-1);
    const isRequested = useRef(false);
    const throttle = useCallback((...args: Parameters<T>) => {
        if (timer.current === -1) {
            callback(...args);
            timer.current = window.setTimeout(() => {
                if (isRequested.current) {
                    callback(...args);
                    isRequested.current = false;
                }
                timer.current = -1;
            }, delay);
        } else {
            isRequested.current = true;
        }
    }, [callback, delay]);
    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    return throttle;
}

export function useDebounce<T extends Callback>(callback: T, delay: number = 100) {
    const timer = useRef(-1);
    const debounce = useCallback((...args: Parameters<T>) => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    return debounce;
}
