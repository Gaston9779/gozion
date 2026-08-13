import { describe, expect, it } from "vitest";
import { themeVariables } from "./index.js";
describe("themeVariables", () => it("allows a theme token to be overridden", () => expect(themeVariables("dark", { primary:"#fff" })["--ui-primary"]).toBe("#fff")));
