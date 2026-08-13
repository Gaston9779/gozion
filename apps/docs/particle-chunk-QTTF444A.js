import {
  CanvasTexture,
  ClampToEdgeWrapping,
  DataTexture,
  DoubleSide,
  FloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer
} from "./particle-chunk-3KY6GLJR.js";
import {
  require_jsx_runtime,
  require_react
} from "./particle-chunk-D55EUJIF.js";
import {
  __toESM
} from "./particle-chunk-5MKB3EB6.js";

// ../../packages/react/dist/particles/react-bits/GridDistortion/GridDistortion.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function createFallbackTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const base = ctx.createLinearGradient(0, 0, 1200, 720);
  base.addColorStop(0, "#171044");
  base.addColorStop(0.48, "#082b42");
  base.addColorStop(1, "#18102e");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1200, 720);
  [[260, 210, 250, "#8b5cf6"], [895, 505, 270, "#22d3ee"], [760, 155, 175, "#f472b6"]].forEach(([x, y, r, color]) => {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, `${color}cc`);
    glow.addColorStop(1, `${color}00`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = "#f5f3ff";
  ctx.lineWidth = 18;
  ctx.globalAlpha = 0.86;
  ctx.strokeRect(390, 150, 420, 420);
  ctx.globalAlpha = 1;
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  return texture;
}
var vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}
`;
var GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = "" }) => {
  const containerRef = (0, import_react.useRef)(null);
  const sceneRef = (0, import_react.useRef)(null);
  const rendererRef = (0, import_react.useRef)(null);
  const cameraRef = (0, import_react.useRef)(null);
  const planeRef = (0, import_react.useRef)(null);
  const imageAspectRef = (0, import_react.useRef)(1);
  const animationIdRef = (0, import_react.useRef)(null);
  const resizeObserverRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!containerRef.current)
      return;
    const container = containerRef.current;
    const scene = new Scene();
    sceneRef.current = scene;
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    rendererRef.current = renderer;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    const camera = new OrthographicCamera(0, 0, 0, 0, -1e3, 1e3);
    camera.position.z = 2;
    cameraRef.current = camera;
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null }
    };
    const fallbackTexture = createFallbackTexture();
    fallbackTexture.colorSpace = SRGBColorSpace;
    uniforms.uTexture.value = fallbackTexture;
    imageAspectRef.current = fallbackTexture.image.width / fallbackTexture.image.height;
    const textureLoader = new TextureLoader();
    if (imageSrc)
      textureLoader.load(imageSrc, (texture) => {
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.wrapS = ClampToEdgeWrapping;
        texture.wrapT = ClampToEdgeWrapping;
        texture.colorSpace = SRGBColorSpace;
        fallbackTexture.dispose();
        imageAspectRef.current = texture.image.width / texture.image.height;
        uniforms.uTexture.value = texture;
        handleResize();
      }, void 0, () => {
      });
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }
    const dataTexture = new DataTexture(data, size, size, RGBAFormat, FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;
    const material = new ShaderMaterial({
      side: DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });
    const geometry = new PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);
    const handleResize = () => {
      if (!container || !renderer || !camera)
        return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0)
        return;
      const containerAspect = width / height;
      renderer.setSize(width, height);
      if (plane) {
        plane.scale.set(containerAspect, 1, 1);
      }
      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      uniforms.resolution.value.set(width, height, 1, 1);
    };
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener("resize", handleResize);
    }
    const mouseState = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0
    };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };
    const handleMouseLeave = () => {
      if (dataTexture) {
        dataTexture.needsUpdate = true;
      }
      Object.assign(mouseState, {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vX: 0,
        vY: 0
      });
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    handleResize();
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (!renderer || !scene || !camera)
        return;
      uniforms.time.value += 0.05;
      if (!(dataTexture.image.data instanceof Float32Array)) {
        console.error("dataTexture.image.data is not a Float32Array");
        return;
      }
      const data2 = dataTexture.image.data;
      for (let i = 0; i < size * size; i++) {
        data2[i * 4] *= relaxation;
        data2[i * 4 + 1] *= relaxation;
      }
      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distSq < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);
            data2[index] += strength * 100 * mouseState.vX * power;
            data2[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }
      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      if (geometry)
        geometry.dispose();
      if (material)
        material.dispose();
      if (dataTexture)
        dataTexture.dispose();
      if (uniforms.uTexture.value)
        uniforms.uTexture.value.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      planeRef.current = null;
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);
  return (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: `distortion-container ${className}`, style: {
    width: "100%",
    height: "100%",
    minWidth: "0",
    minHeight: "0"
  } });
};
var GridDistortion_default = GridDistortion;

export {
  GridDistortion_default
};
