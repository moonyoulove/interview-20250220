import { describe, expect, test } from "vitest";
import { convertTemperature } from "../../src/utils/index.ts";
import { TemperatureUnit } from "../../src/types";

describe("convertTemperature", () => {
    test("should convert Celsius to Fahrenheit", () => {
        const result = convertTemperature(0, TemperatureUnit.Fahrenheit);
        expect(result).toBe("32");
    });

    test("should return the same temperature in Celsius", () => {
        const result = convertTemperature(25, TemperatureUnit.Celsius);
        expect(result).toBe("25");
    });
});
