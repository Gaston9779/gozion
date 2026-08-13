import {
  ClampToEdgeWrapping,
  DataTexture,
  DoubleSide,
  FloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer
} from "./particle-chunk-IPFRVYGG.js";
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
var fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%238b5cf6"/%3E%3Cstop offset=".5" stop-color="%2322d3ee"/%3E%3Cstop offset="1" stop-color="%23f472b6"/%3E%3C/linearGradient%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="34"/%3E%3C/filter%3E%3C/defs%3E%3Crect width="1200" height="720" fill="%23090c14"/%3E%3Ccircle cx="285" cy="200" r="250" fill="%238b5cf6" opacity=".72" filter="url(%23b)"/%3E%3Ccircle cx="870" cy="520" r="270" fill="%2322d3ee" opacity=".62" filter="url(%23b)"/%3E%3Cpath d="M280 490V225l210-125 210 125v70l-115-68-95 56v150l95 56 115-68v72L490 612z" fill="none" stroke="url(%23a)" stroke-width="46" stroke-linejoin="round"/%3E%3C/svg%3E';
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
var GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc = fallbackImage, className = "" }) => {
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
    const textureLoader = new TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.wrapS = ClampToEdgeWrapping;
      texture.wrapT = ClampToEdgeWrapping;
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;
      handleResize();
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
