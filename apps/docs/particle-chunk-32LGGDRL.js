import {
  Canvas,
  useFrame,
  useThree
} from "./particle-chunk-2IW5ICPP.js";
import {
  Color
} from "./particle-chunk-IPFRVYGG.js";
import "./particle-chunk-APO56BIP.js";
import {
  require_jsx_runtime
} from "./particle-chunk-NPM7I72K.js";
import {
  require_react
} from "./particle-chunk-75ALB3LL.js";
import {
  __toESM
} from "./particle-chunk-5MKB3EB6.js";

// ../../packages/react/src/particles/react-bits/Silk/Silk.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var hexToNormalizedRGB = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};
var vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;
var SilkPlane = (0, import_react.forwardRef)(function SilkPlane2({ uniforms }, ref) {
  const { viewport } = useThree();
  (0, import_react.useLayoutEffect)(() => {
    const mesh = ref;
    if (mesh.current) {
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);
  useFrame((_state, delta) => {
    const mesh = ref;
    if (mesh.current) {
      const material = mesh.current.material;
      material.uniforms.uTime.value += 0.1 * delta;
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1, 1, 1, 1] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", { uniforms, vertexShader, fragmentShader })
  ] });
});
SilkPlane.displayName = "SilkPlane";
var Silk = ({ speed = 5, scale = 1, color = "#7B7481", noiseIntensity = 1.5, rotation = 0 }) => {
  const meshRef = (0, import_react.useRef)(null);
  const uniforms = (0, import_react.useMemo)(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  (0, import_react.useEffect)(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uColor.value.setRGB(...hexToNormalizedRGB(color));
    uniforms.uRotation.value = rotation;
  }, [speed, scale, noiseIntensity, color, rotation, uniforms]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, { dpr: [1, 2], frameloop: "always", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SilkPlane, { ref: meshRef, uniforms }) });
};
var Silk_default = Silk;
export {
  Silk_default as default
};
