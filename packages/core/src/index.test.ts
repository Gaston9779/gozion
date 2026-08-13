import { describe, expect, it } from "vitest";
import { hoverStyle } from "./index.js";
describe("hoverStyle", () => it("maps common effects to CSS variables", () => expect(hoverStyle({ scale: 1.05, translateY: "-4px" })).toMatchObject({ "--ui-hover-scale":"1.05", "--ui-hover-y":"-4px" })));
