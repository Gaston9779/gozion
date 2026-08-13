import {
  Canvas,
  useFrame,
  useThree
} from "./particle-chunk-MC4DO3S2.js";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DepthTexture,
  FloatType,
  HalfFloatType,
  LinearFilter,
  MeshStandardMaterial,
  ShaderLib,
  ShaderMaterial,
  UniformsUtils,
  WebGLRenderTarget
} from "./particle-chunk-3KY6GLJR.js";
import {
  require_jsx_runtime,
  require_react
} from "./particle-chunk-D55EUJIF.js";
import {
  __toESM
} from "./particle-chunk-5MKB3EB6.js";

// ../../packages/react/dist/particles/react-bits/Beams/Beams.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react2 = __toESM(require_react(), 1);

// ../../node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// ../../node_modules/.pnpm/@react-three+drei@10.7.8_@react-three+fiber@9.7.0_@types+react@19.2.18_react-dom@19.2.8_react_pkfy32tuc7s3dmuum6bmmf2kiq/node_modules/@react-three/drei/core/Fbo.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
function useFBO(width, height, settings) {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const _width = typeof width === "number" ? width : size.width * viewport.dpr;
  const _height = typeof height === "number" ? height : size.height * viewport.dpr;
  const _settings = (typeof width === "number" ? settings : width) || {};
  const {
    samples = 0,
    depth,
    ...targetSettings
  } = _settings;
  const depthBuffer = depth !== null && depth !== void 0 ? depth : _settings.depthBuffer;
  const target = React.useMemo(() => {
    const target2 = new WebGLRenderTarget(_width, _height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...targetSettings
    });
    if (depthBuffer) {
      target2.depthTexture = new DepthTexture(_width, _height, FloatType);
    }
    target2.samples = samples;
    return target2;
  }, []);
  React.useLayoutEffect(() => {
    target.setSize(_width, _height);
    if (samples) target.samples = samples;
  }, [samples, target, _width, _height]);
  React.useEffect(() => {
    return () => target.dispose();
  }, []);
  return target;
}

// ../../node_modules/.pnpm/@react-three+drei@10.7.8_@react-three+fiber@9.7.0_@types+react@19.2.18_react-dom@19.2.8_react_pkfy32tuc7s3dmuum6bmmf2kiq/node_modules/@react-three/drei/core/PerspectiveCamera.js
var React2 = __toESM(require_react());
var isFunction = (node) => typeof node === "function";
var PerspectiveCamera = /* @__PURE__ */ React2.forwardRef(({
  envMap,
  resolution = 256,
  frames = Infinity,
  makeDefault,
  children,
  ...props
}, ref) => {
  const set = useThree(({
    set: set2
  }) => set2);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const size = useThree(({
    size: size2
  }) => size2);
  const cameraRef = React2.useRef(null);
  React2.useImperativeHandle(ref, () => cameraRef.current, []);
  const groupRef = React2.useRef(null);
  const fbo = useFBO(resolution);
  React2.useLayoutEffect(() => {
    if (!props.manual) {
      cameraRef.current.aspect = size.width / size.height;
    }
  }, [size, props]);
  React2.useLayoutEffect(() => {
    cameraRef.current.updateProjectionMatrix();
  });
  let count = 0;
  let oldEnvMap = null;
  const functional = isFunction(children);
  useFrame((state) => {
    if (functional && (frames === Infinity || count < frames)) {
      groupRef.current.visible = false;
      state.gl.setRenderTarget(fbo);
      oldEnvMap = state.scene.background;
      if (envMap) state.scene.background = envMap;
      state.gl.render(state.scene, cameraRef.current);
      state.scene.background = oldEnvMap;
      state.gl.setRenderTarget(null);
      groupRef.current.visible = true;
      count++;
    }
  });
  React2.useLayoutEffect(() => {
    if (makeDefault) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [cameraRef, makeDefault, set]);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("perspectiveCamera", _extends({
    ref: cameraRef
  }, props), !functional && children), /* @__PURE__ */ React2.createElement("group", {
    ref: groupRef
  }, functional && children(fbo.texture)));
});

// ../../node_modules/.pnpm/camera-controls@3.1.2_three@0.185.1/node_modules/camera-controls/dist/camera-controls.module.js
var ACTION = Object.freeze({
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  SCREEN_PAN: 4,
  OFFSET: 8,
  DOLLY: 16,
  ZOOM: 32,
  TOUCH_ROTATE: 64,
  TOUCH_TRUCK: 128,
  TOUCH_SCREEN_PAN: 256,
  TOUCH_OFFSET: 512,
  TOUCH_DOLLY: 1024,
  TOUCH_ZOOM: 2048,
  TOUCH_DOLLY_TRUCK: 4096,
  TOUCH_DOLLY_SCREEN_PAN: 8192,
  TOUCH_DOLLY_OFFSET: 16384,
  TOUCH_DOLLY_ROTATE: 32768,
  TOUCH_ZOOM_TRUCK: 65536,
  TOUCH_ZOOM_OFFSET: 131072,
  TOUCH_ZOOM_SCREEN_PAN: 262144,
  TOUCH_ZOOM_ROTATE: 524288
});
var PI_2 = Math.PI * 2;
var PI_HALF = Math.PI / 2;
var DEG2RAD = Math.PI / 180;
var TOUCH_DOLLY_FACTOR = 1 / 8;
var isMac = /Mac/.test(globalThis?.navigator?.platform);

// ../../node_modules/.pnpm/three@0.185.1/node_modules/three/src/math/MathUtils.js
var DEG2RAD2 = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
function degToRad(degrees) {
  return degrees * DEG2RAD2;
}

// ../../packages/react/dist/particles/react-bits/Beams/Beams.js
function extendMaterial(BaseMaterial, cfg) {
  const physical = ShaderLib.physical;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};
  const uniforms = UniformsUtils.clone(baseUniforms);
  const defaults = new BaseMaterial(cfg.material || {});
  if (defaults.color)
    uniforms.diffuse.value = defaults.color;
  if ("roughness" in defaults)
    uniforms.roughness.value = defaults.roughness;
  if ("metalness" in defaults)
    uniforms.metalness.value = defaults.metalness;
  if ("envMap" in defaults)
    uniforms.envMap.value = defaults.envMap;
  if ("envMapIntensity" in defaults)
    uniforms.envMapIntensity.value = defaults.envMapIntensity;
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === "object" && "value" in u ? u : { value: u };
  });
  let vert = `${cfg.header}
${cfg.vertexHeader ?? ""}
${baseVert}`;
  let frag = `${cfg.header}
${cfg.fragmentHeader ?? ""}
${baseFrag}`;
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}
${code}`);
  }
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}
${code}`);
  }
  const mat = new ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog
  });
  return mat;
}
var CanvasWrapper = ({ children }) => (0, import_jsx_runtime.jsx)(Canvas, { dpr: [1, 2], frameloop: "always", className: "beams-container", children });
var hexToNormalizedRGB = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};
var noise = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`;
var Beams = ({ beamWidth = 2, beamHeight = 15, beamNumber = 12, lightColor = "#ffffff", speed = 2, noiseIntensity = 1.75, scale = 0.2, rotation = 0 }) => {
  const meshRef = (0, import_react2.useRef)(null);
  const beamMaterial = (0, import_react2.useMemo)(() => extendMaterial(MeshStandardMaterial, {
    header: `
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${noise}`,
    vertexHeader: `
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
    fragmentHeader: "",
    vertex: {
      "#include <begin_vertex>": `transformed.z += getPos(transformed.xyz);`,
      "#include <beginnormal_vertex>": `objectNormal = getNormal(position.xyz);`
    },
    fragment: {
      "#include <dithering_fragment>": `
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`
    },
    material: { fog: true },
    uniforms: {
      diffuse: new Color(...hexToNormalizedRGB("#000000")),
      time: { shared: true, mixed: true, linked: true, value: 0 },
      roughness: 0.3,
      metalness: 0.3,
      uSpeed: { shared: true, mixed: true, linked: true, value: speed },
      envMapIntensity: 10,
      uNoiseIntensity: noiseIntensity,
      uScale: scale
    }
  }), [speed, noiseIntensity, scale]);
  return (0, import_jsx_runtime.jsxs)(CanvasWrapper, { children: [(0, import_jsx_runtime.jsxs)("group", { rotation: [0, 0, degToRad(rotation)], children: [(0, import_jsx_runtime.jsx)(PlaneNoise, { ref: meshRef, material: beamMaterial, count: beamNumber, width: beamWidth, height: beamHeight }), (0, import_jsx_runtime.jsx)(DirLight, { color: lightColor, position: [0, 3, 10] })] }), (0, import_jsx_runtime.jsx)("ambientLight", { intensity: 1 }), (0, import_jsx_runtime.jsx)("color", { attach: "background", args: ["#000000"] }), (0, import_jsx_runtime.jsx)(PerspectiveCamera, { makeDefault: true, position: [0, 0, 20], fov: 30 })] });
};
function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {
  const geometry = new BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);
  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;
  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300;
    const uvYOffset = Math.random() * 300;
    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      const v0 = [xOffset, y, 0];
      const v1 = [xOffset + width, y, 0];
      positions.set([...v0, ...v1], vertexOffset * 3);
      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);
      if (j < heightSegments) {
        const a = vertexOffset, b = vertexOffset + 1, c = vertexOffset + 2, d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}
var MergedPlanes = (0, import_react2.forwardRef)(({ material, width, count, height }, ref) => {
  const mesh = (0, import_react2.useRef)(null);
  (0, import_react2.useImperativeHandle)(ref, () => mesh.current);
  const geometry = (0, import_react2.useMemo)(() => createStackedPlanesBufferGeometry(count, width, height, 0, 100), [count, width, height]);
  useFrame((_, delta) => {
    mesh.current.material.uniforms.time.value += 0.1 * delta;
  });
  return (0, import_jsx_runtime.jsx)("mesh", { ref: mesh, geometry, material });
});
MergedPlanes.displayName = "MergedPlanes";
var PlaneNoise = (0, import_react2.forwardRef)((props, ref) => (0, import_jsx_runtime.jsx)(MergedPlanes, { ref, material: props.material, width: props.width, count: props.count, height: props.height }));
PlaneNoise.displayName = "PlaneNoise";
var DirLight = ({ position, color }) => {
  const dir = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (!dir.current)
      return;
    const cam = dir.current.shadow.camera;
    cam.top = 24;
    cam.bottom = -24;
    cam.left = -24;
    cam.right = 24;
    cam.far = 64;
    dir.current.shadow.bias = -4e-3;
  }, []);
  return (0, import_jsx_runtime.jsx)("directionalLight", { ref: dir, color, intensity: 1, position });
};
var Beams_default = Beams;

export {
  Beams_default
};
/*! Bundled license information:

camera-controls/dist/camera-controls.module.js:
  (*!
   * camera-controls
   * https://github.com/yomotsu/camera-controls
   * (c) 2017 @yomotsu
   * Released under the MIT License.
   *)
*/
