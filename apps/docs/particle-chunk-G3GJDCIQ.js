import {
  gsapWithCSS
} from "./particle-chunk-7SZ6WFMZ.js";
import {
  require_jsx_runtime,
  require_react
} from "./particle-chunk-D55EUJIF.js";
import {
  __toESM
} from "./particle-chunk-5MKB3EB6.js";

// ../../packages/react/dist/particles/react-bits/GridMotion/GridMotion.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var GridMotion = ({ items = [], gradientColor = "black" }) => {
  const gridRef = (0, import_react.useRef)(null);
  const rowRefs = (0, import_react.useRef)([]);
  const mouseXRef = (0, import_react.useRef)(window.innerWidth / 2);
  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;
  (0, import_react.useEffect)(() => {
    gsapWithCSS.ticker.lagSmoothing(0);
    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };
    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = (mouseXRef.current / window.innerWidth * maxMoveAmount - maxMoveAmount / 2) * direction;
          gsapWithCSS.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });
    };
    const removeAnimationLoop = gsapWithCSS.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, []);
  return (0, import_jsx_runtime.jsx)("div", { className: "noscroll loading", ref: gridRef, children: (0, import_jsx_runtime.jsxs)("section", { className: "intro", style: {
    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
  }, children: [(0, import_jsx_runtime.jsx)("div", { className: "gridMotion-container", children: Array.from({ length: 4 }, (_, rowIndex) => (0, import_jsx_runtime.jsx)("div", { className: "row", ref: (el) => {
    rowRefs.current[rowIndex] = el;
  }, children: Array.from({ length: 7 }, (_2, itemIndex) => {
    const content = combinedItems[rowIndex * 7 + itemIndex];
    return (0, import_jsx_runtime.jsx)("div", { className: "row__item", children: (0, import_jsx_runtime.jsx)("div", { className: "row__item-inner", style: { backgroundColor: "#111" }, children: typeof content === "string" && content.startsWith("http") ? (0, import_jsx_runtime.jsx)("div", { className: "row__item-img", style: {
      backgroundImage: `url(${content})`
    } }) : (0, import_jsx_runtime.jsx)("div", { className: "row__item-content", children: content }) }) }, itemIndex);
  }) }, rowIndex)) }), (0, import_jsx_runtime.jsx)("div", { className: "fullview" })] }) });
};
var GridMotion_default = GridMotion;

export {
  GridMotion_default
};
