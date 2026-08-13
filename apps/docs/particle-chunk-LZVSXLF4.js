import {
  DepthDownsamplingPass,
  Effect,
  EffectComposer,
  EffectPass,
  NormalPass,
  Pass,
  RenderPass
} from "./particle-chunk-NWIJGTBM.js";
import {
  Canvas,
  extend,
  useFrame,
  useThree
} from "./particle-chunk-2IW5ICPP.js";
import {
  Color,
  HalfFloatType,
  Matrix4,
  NoToneMapping,
  REVISION,
  Uniform,
  Vector2,
  Vector3,
  WebGLRenderTarget
} from "./particle-chunk-IPFRVYGG.js";
import "./particle-chunk-APO56BIP.js";
import {
  require_jsx_runtime
} from "./particle-chunk-NPM7I72K.js";
import {
  require_react
} from "./particle-chunk-75ALB3LL.js";
import {
  __publicField,
  __toESM
} from "./particle-chunk-5MKB3EB6.js";

// ../../packages/react/src/particles/react-bits/Dither/Dither.tsx
var import_react2 = __toESM(require_react(), 1);

// ../../node_modules/.pnpm/@react-three+postprocessing@3.0.5_@react-three+fiber@9.7.0_@types+react@19.2.18_react-dom@19._ectgjigq7rxoocd2dekh3dprxe/node_modules/@react-three/postprocessing/dist/index.js
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);

// ../../node_modules/.pnpm/maath@0.10.8_@types+three@0.185.4_three@0.185.1/node_modules/maath/dist/objectSpread2-284232a6.esm.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// ../../node_modules/.pnpm/maath@0.10.8_@types+three@0.185.4_three@0.185.1/node_modules/maath/dist/triangle-b62b9067.esm.js
var mv1 = new Vector2();
var mv2 = new Vector2();

// ../../node_modules/.pnpm/maath@0.10.8_@types+three@0.185.4_three@0.185.1/node_modules/maath/dist/classCallCheck-9098b006.esm.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// ../../node_modules/.pnpm/maath@0.10.8_@types+three@0.185.4_three@0.185.1/node_modules/maath/dist/index-0332b2ed.esm.js
var Grad = function Grad2(x, y, z) {
  var _this = this;
  _classCallCheck(this, Grad2);
  _defineProperty(this, "dot2", function(x2, y2) {
    return _this.x * x2 + _this.y * y2;
  });
  _defineProperty(this, "dot3", function(x2, y2, z2) {
    return _this.x * x2 + _this.y * y2 + _this.z * z2;
  });
  this.x = x;
  this.y = y;
  this.z = z;
};
var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
var perm = new Array(512);
var gradP = new Array(512);
var seed = function seed2(_seed) {
  if (_seed > 0 && _seed < 1) {
    _seed *= 65536;
  }
  _seed = Math.floor(_seed);
  if (_seed < 256) {
    _seed |= _seed << 8;
  }
  for (var i = 0; i < 256; i++) {
    var v;
    if (i & 1) {
      v = p[i] ^ _seed & 255;
    } else {
      v = p[i] ^ _seed >> 8 & 255;
    }
    perm[i] = perm[i + 256] = v;
    gradP[i] = gradP[i + 256] = grad3[v % 12];
  }
};
seed(0);
var F2 = 0.5 * (Math.sqrt(3) - 1);
var G2 = (3 - Math.sqrt(3)) / 6;
var F3 = 1 / 3;
var G3 = 1 / 6;
var TAU = Math.PI * 2;
function normalizeSeed(seed3) {
  if (typeof seed3 === "number") {
    seed3 = Math.abs(seed3);
  } else if (typeof seed3 === "string") {
    var string = seed3;
    seed3 = 0;
    for (var i = 0; i < string.length; i++) {
      seed3 = (seed3 + (i + 1) * (string.charCodeAt(i) % 96)) % 2147483647;
    }
  }
  if (seed3 === 0) {
    seed3 = 311;
  }
  return seed3;
}
function lcgRandom(seed3) {
  var state = normalizeSeed(seed3);
  return function() {
    var result = state * 48271 % 2147483647;
    state = result;
    return result / 2147483647;
  };
}
var Generator = function Generator2(_seed) {
  var _this = this;
  _classCallCheck(this, Generator2);
  _defineProperty(this, "seed", 0);
  _defineProperty(this, "init", function(seed3) {
    _this.seed = seed3;
    _this.value = lcgRandom(seed3);
  });
  _defineProperty(this, "value", lcgRandom(this.seed));
  this.init(_seed);
};
var defaultGen = new Generator(Math.random());

// ../../node_modules/.pnpm/n8ao@2.0.1_postprocessing@6.39.4_three@0.185.1__three@0.185.1/node_modules/n8ao/dist/N8AO.js
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $62561e92e160ec9a$exports = {};
$62561e92e160ec9a$exports = JSON.parse('{"architecture":"attention-v3-int8","formatVersion":3,"globalBias":[-0.32877659797668457,0.4370867609977722,-0.05251404270529747,1.3072023391723633,0.0477047860622406,0.24477416276931763,0.009111796505749226,-0.17459993064403534],"globalFeatureInverseStandardDeviation":[10.771836280822754,1.9548665285110474,1.612365484237671],"globalFeatureMean":[0.9198138117790222,-0.49808526039123535,0.03374629095196724],"globalWeights":[101,-4,7,-127,6,-11,3,1,0,-16,-7,8,-8,-1,7,-4,0,0,-12,-3,-13,1,0,2],"headBias":[-0.15895532071590424,0.007501596584916115,-0.47742825746536255,0.01632097363471985,-0.48355796933174133,-0.1052703931927681,-0.8414919376373291,-0.21046382188796997],"headWeights":[-45,-7,-45,-20,7,-13,120,-24,-15,-26,-19,1,27,-48,-4,-10,1,-5,-24,64,91,-1,-68,39,54,39,101,-40,-127,64,-41,-17,-23,-19,3,35,-2,33,3,9,-64,-32,30,42,-112,12,28,-11,15,2,-4,-7,7,-3,-5,1,76,48,-34,-67,103,-40,-26,1,58,-11,46,-41,5,-6,-17,-8,13,17,-35,45,27,-17,-28,7,-53,12,-51,6,-32,-5,58,-9,-28,-21,37,-12,1,20,2,2,11,7,-4,-9,2,-15,-1,-8,16,12,-27,-1,61,-5,-1,4,-7,-2,7,4,1,4,-2,4,-18,-16,28,6,-65,16,3,-3,-5,-2,0,-40,-21,-22,14,30,-21,49,15,-64,43,19,23,18,5,-15,21,21,30,17,-11,-6,22,-38,-20,97,-46,-5,-13,-59,26,-13,11,-2,-10,-8,2,-15,-17,-27,-9,26,7,-7,6,9,-32,5,-9,12,49,17,-1,24,20,35,14,-33,-50,-1,-4,-26,11,11,9,-80,30,9,36,6,-12,-4,-7,39,-10,-30,-49,1,-43,-20,-34,76,-36,-10,15,-8,43,31,38,-42,39,37,-7,7,8,16,28,-83,32,9,23,-13,39,119,23,-127,-24,8,-48,-29,-7,-33,-12,58,-24,-29,-19,12,-55,-90,0,126,26,42,54,22],"keyProjectionWeights":[0,-1,-1,1,1,1,1,1,-64,32,49,23,-25,4,27,-22,0,1,-1,-1,-1,1,1,0,-34,38,64,88,13,-53,-41,58,-7,-4,79,-41,27,26,14,2,-2,1,1,1,-1,-1,1,1,1,-1,-1,-1,-1,-1,1,1,4,-3,126,42,-40,-116,35,20],"name":"residual-attention-v3-50m-qat-int8-epoch-25-zo-278w","outputBias":-0.0005526235327124596,"outputWeights":[11,11,14,-27,9,-22,127,6],"quantization":{"scales":{"globalWeight":0.021090541950849095,"headWeight":0.04935851140909355,"keyWeight":0.1733924937791441,"outputWeight":0.0030087142047955295,"tapInputWeight":0.1096231754049479,"tapOutputWeight":0.017949438644286102,"valueWeight":0.013986751242596301},"scheme":"symmetric-int8-per-tensor","zeroPoint":0},"summaryQueries":[0.0038647791370749474,0.09565000981092453,0.002756686182692647,-0.08183622360229492,-0.15209506452083588,-0.0006105066277086735,0.0010439646430313587,-0.03020688332617283,0.005065929610282183,0.14488759636878967,0.003160916268825531,-0.0855727270245552,-0.3123375475406647,0.00039022407145239413,0.0037786494940519333,0.1451321840286255,-0.002009483054280281,0.0597594790160656,0.0045239729806780815,-0.08765853196382523,-0.13884992897510529,-0.0021647117100656033,0.003985927440226078,0.09727758169174194,0.007170629221946001,0.0786278173327446,0.004103775601834059,-0.1198369711637497,-0.2925199568271637,-0.002055276418104768,0.0030450925696641207,0.14401987195014954],"supportedDenoiseSamples":[4,8,16],"tapFeatureInverseStandardDeviation":[2.283243417739868,0.8810898065567017,0.8210930228233337,3.752316474914551,3.6375720500946045,2.670454978942871,10.249449729919434,0.12639354169368744,100],"tapFeatureMean":[0.010318092070519924,0.01364430133253336,0.13411010801792145,-0.004725644364953041,0.10053129494190216,0.8384788632392883,0.9203217625617981,1.7139031887054443,1],"tapInputBias":[0.4780646860599518,-0.45214661955833435,0.289407879114151,0.34804567694664,-0.1320028454065323,0.17722633481025696,0.011480014771223068,-0.26692497730255127],"tapInputWeights":[0,1,7,0,-1,-7,0,31,-2,-1,14,-126,0,0,-1,2,26,-2,0,66,-73,0,0,0,-12,22,-3,0,-76,-90,0,-1,-7,-3,58,-1,0,2,6,0,0,3,4,-40,0,0,3,-13,0,0,1,-7,-13,0,0,-7,10,0,-2,-7,0,-39,-2,0,-13,-19,0,-2,20,-1,3,-1],"tapOutputBias":[-0.3867710530757904,0.1349504142999649,0.35706064105033875,-0.5938405394554138,-0.031154220923781395,1.4079623222351074,-1.9221038818359375,0.6029739379882812],"tapOutputWeights":[18,-4,47,19,74,-94,-21,-9,73,-59,88,-10,-3,71,-7,24,20,74,24,-31,-12,-10,-15,-45,-126,2,-4,27,-5,24,35,-11,-4,9,-8,26,-10,27,26,-20,17,-50,5,-35,0,-5,12,-71,89,-58,22,-83,-115,7,-16,-89,89,22,1,-20,-22,-25,-26,44],"valueProjectionWeights":[-16,-6,40,-17,84,-76,59,51,-10,-2,-10,-1,-23,74,-70,23,-5,4,4,-7,-77,127,20,-48,-36,4,-17,-12,-4,10,29,-27,-2,11,-47,-50,-54,-3,14,11,-23,-1,109,31,4,-100,-33,-36,-19,0,-8,20,-35,-24,79,2,44,2,5,7,22,-70,-67,-35]}');
var $1193f60a44983e43$var$MATRIX_LAYOUTS = [
  [
    "tapInputWeight",
    "tapInputWeights",
    8,
    9
  ],
  [
    "tapOutputWeight",
    "tapOutputWeights",
    8,
    8
  ],
  [
    "globalWeight",
    "globalWeights",
    8,
    3
  ],
  [
    "keyWeight",
    "keyProjectionWeights",
    8,
    8
  ],
  [
    "valueWeight",
    "valueProjectionWeights",
    8,
    8
  ],
  [
    "headWeight",
    "headWeights",
    8,
    32
  ],
  [
    "outputWeight",
    "outputWeights",
    1,
    8
  ]
];
var $1193f60a44983e43$var$scale = (name) => {
  const value = (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).quantization?.scales?.[name];
  if (!(value > 0) || !Number.isFinite(value)) throw new Error(`The bundled N8AO neural model has no valid ${name} scale.`);
  return value;
};
if ((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).architecture !== "attention-v3-int8" || (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).formatVersion !== 3 || (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).quantization?.scheme !== "symmetric-int8-per-tensor" || (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).quantization?.zeroPoint !== 0 || (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).supportedDenoiseSamples?.join(",") !== "4,8,16" || $1193f60a44983e43$var$MATRIX_LAYOUTS.some(([, field, rows, columns]) => (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports))[field]?.length !== rows * columns || (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports))[field].some((value) => !Number.isInteger(value) || value < -127 || value > 127))) throw new Error("The bundled N8AO neural denoise model has an unsupported layout.");
var $1193f60a44983e43$var$glslFloat = (value) => {
  if (!Number.isFinite(value)) throw new Error("The bundled N8AO neural model contains a non-finite value.");
  if (Object.is(value, -0)) return "0.0";
  const text = Number(value).toString();
  return /[.eE]/.test(text) ? text : `${text}.0`;
};
var $1193f60a44983e43$var$COMPONENTS = [
  "x",
  "y",
  "z",
  "w"
];
var $1193f60a44983e43$var$tokenAccessors = (name) => [
  ...$1193f60a44983e43$var$COMPONENTS.map((component) => `${name}.lo.${component}`),
  ...$1193f60a44983e43$var$COMPONENTS.map((component) => `${name}.hi.${component}`)
];
var $1193f60a44983e43$var$weightedTerm = (coefficient, input) => {
  if (coefficient === 0) return null;
  if (coefficient === 1) return input;
  if (coefficient === -1) return `(-${input})`;
  if (coefficient < 0) return `(-${$1193f60a44983e43$var$glslFloat(-coefficient)} * ${input})`;
  return `${$1193f60a44983e43$var$glslFloat(coefficient)} * ${input}`;
};
var $1193f60a44983e43$var$floatWeightedTerm = (coefficient, input) => {
  if (coefficient === 0) return null;
  return `${$1193f60a44983e43$var$glslFloat(coefficient)} * ${input}`;
};
var $1193f60a44983e43$var$sumTerms = (terms) => terms.filter(Boolean).join(" + ") || "0.0";
var $1193f60a44983e43$var$quantizedRow = (weights, row, width, inputs, tensorScale, bias) => {
  const terms = inputs.map((input, column) => $1193f60a44983e43$var$weightedTerm(weights[row * width + column], input));
  return `${$1193f60a44983e43$var$glslFloat(tensorScale)} * (${$1193f60a44983e43$var$sumTerms(terms)}) + ${$1193f60a44983e43$var$glslFloat(bias[row])}`;
};
var $1193f60a44983e43$var$vec4 = (values, indent = "        ") => `vec4(
${values.map((value) => `${indent}    ${value}`).join(",\n")}
${indent})`;
var $1193f60a44983e43$var$tokenLayer = ({ functionName, scaleName, weights, bias, width = 8, relu = false }) => {
  const inputs = $1193f60a44983e43$var$tokenAccessors("inputToken");
  const tensorScale = $1193f60a44983e43$var$scale(scaleName);
  const rows = Array.from({
    length: 8
  }, (_, row) => $1193f60a44983e43$var$quantizedRow(weights, row, width, inputs, tensorScale, bias));
  const low = $1193f60a44983e43$var$vec4(rows.slice(0, 4));
  const high = $1193f60a44983e43$var$vec4(rows.slice(4));
  const wrap = (value) => relu ? `max(${value}, vec4(0.0))` : value;
  return `
    NeuralToken neural${functionName[0].toUpperCase()}${functionName.slice(1)}(NeuralToken inputToken) {
        return NeuralToken(
            ${wrap(low)},
            ${wrap(high)}
        );
    }
`;
};
var $1193f60a44983e43$var$foldedBias = (weights, bias, means, inverseStandardDeviations, rows, width, tensorScale, constantInputs = {}) => Array.from({
  length: rows
}, (_, row) => {
  let value = bias[row];
  for (let column = 0; column < width; column++) {
    const weight = weights[row * width + column] * tensorScale;
    value -= weight * inverseStandardDeviations[column] * means[column];
    if (Object.hasOwn(constantInputs, column)) value += weight * inverseStandardDeviations[column] * constantInputs[column];
  }
  return value;
});
var $1193f60a44983e43$var$tapInputScale = $1193f60a44983e43$var$scale("tapInputWeight");
var $1193f60a44983e43$var$tapInputBias = $1193f60a44983e43$var$foldedBias((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapInputWeights, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapInputBias, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapFeatureMean, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapFeatureInverseStandardDeviation, 8, 9, $1193f60a44983e43$var$tapInputScale, {
  8: 1
});
var $1193f60a44983e43$var$tapScaledAccessors = $1193f60a44983e43$var$tokenAccessors("scaledInput");
var $1193f60a44983e43$var$tapInputRows = Array.from({
  length: 8
}, (_, row) => $1193f60a44983e43$var$quantizedRow((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapInputWeights, row, 9, $1193f60a44983e43$var$tapScaledAccessors, $1193f60a44983e43$var$tapInputScale, $1193f60a44983e43$var$tapInputBias));
var $1193f60a44983e43$var$tapInputShader = `
    NeuralToken neuralTapInput(NeuralToken raw) {
        NeuralToken scaledInput = NeuralToken(
            raw.lo * ${$1193f60a44983e43$var$vec4((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapFeatureInverseStandardDeviation.slice(0, 4), "            ")},
            raw.hi * ${$1193f60a44983e43$var$vec4((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapFeatureInverseStandardDeviation.slice(4, 8), "            ")}
        );
        return NeuralToken(
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$tapInputRows.slice(0, 4))}, vec4(0.0)),
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$tapInputRows.slice(4))}, vec4(0.0))
        );
    }
`;
var $1193f60a44983e43$var$globalScale = $1193f60a44983e43$var$scale("globalWeight");
var $1193f60a44983e43$var$globalBias = $1193f60a44983e43$var$foldedBias((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalWeights, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalBias, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalFeatureMean, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalFeatureInverseStandardDeviation, 8, 3, $1193f60a44983e43$var$globalScale);
var $1193f60a44983e43$var$globalInputs = $1193f60a44983e43$var$COMPONENTS.slice(0, 3).map((component) => `scaledInput.${component}`);
var $1193f60a44983e43$var$globalRows = Array.from({
  length: 8
}, (_, row) => $1193f60a44983e43$var$quantizedRow((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalWeights, row, 3, $1193f60a44983e43$var$globalInputs, $1193f60a44983e43$var$globalScale, $1193f60a44983e43$var$globalBias));
var $1193f60a44983e43$var$globalInputShader = `
    NeuralToken neuralEncodeGlobal(vec4 raw) {
        vec3 scaledInput = raw.xyz * vec3(
            ${(0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).globalFeatureInverseStandardDeviation.map($1193f60a44983e43$var$glslFloat).join(", ")}
        );
        return NeuralToken(
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$globalRows.slice(0, 4))}, vec4(0.0)),
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$globalRows.slice(4))}, vec4(0.0))
        );
    }
`;
var $1193f60a44983e43$var$queryInputs = $1193f60a44983e43$var$tokenAccessors("key");
var $1193f60a44983e43$var$queryRows = Array.from({
  length: 4
}, (_, query) => $1193f60a44983e43$var$sumTerms($1193f60a44983e43$var$queryInputs.map((input, column) => $1193f60a44983e43$var$floatWeightedTerm((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).summaryQueries[query * 8 + column], input))));
var $1193f60a44983e43$var$queryShader = `
    vec4 neuralQueryScores(NeuralToken key) {
        return ${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$queryRows)};
    }
`;
var $1193f60a44983e43$var$summaryInputs = [];
for (let query = 0; query < 4; query++) $1193f60a44983e43$var$summaryInputs.push(...$1193f60a44983e43$var$COMPONENTS.map((component) => `runningSummaryLo[${query}].${component}`), ...$1193f60a44983e43$var$COMPONENTS.map((component) => `runningSummaryHi[${query}].${component}`));
var $1193f60a44983e43$var$headScale = $1193f60a44983e43$var$scale("headWeight");
var $1193f60a44983e43$var$headRows = Array.from({
  length: 8
}, (_, row) => $1193f60a44983e43$var$quantizedRow((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).headWeights, row, 32, $1193f60a44983e43$var$summaryInputs, $1193f60a44983e43$var$headScale, (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).headBias));
var $1193f60a44983e43$var$headShader = `
    NeuralToken neuralHead(
        vec4 runningSummaryLo[4],
        vec4 runningSummaryHi[4]
    ) {
        return NeuralToken(
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$headRows.slice(0, 4))}, vec4(0.0)),
            max(${$1193f60a44983e43$var$vec4($1193f60a44983e43$var$headRows.slice(4))}, vec4(0.0))
        );
    }
`;
var $1193f60a44983e43$var$outputExpression = $1193f60a44983e43$var$quantizedRow((0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).outputWeights, 0, 8, $1193f60a44983e43$var$tokenAccessors("head"), $1193f60a44983e43$var$scale("outputWeight"), [
  (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).outputBias
]);
var $1193f60a44983e43$var$outputShader = `
    float neuralOutput(NeuralToken head) {
        return ${$1193f60a44983e43$var$outputExpression};
    }
`;
var $1193f60a44983e43$export$d75ad64dd346ec0e = [
  $1193f60a44983e43$var$tapInputShader,
  $1193f60a44983e43$var$tokenLayer({
    functionName: "tapOutput",
    scaleName: "tapOutputWeight",
    weights: (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapOutputWeights,
    bias: (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).tapOutputBias,
    relu: true
  }),
  $1193f60a44983e43$var$globalInputShader,
  $1193f60a44983e43$var$tokenLayer({
    functionName: "keyProject",
    scaleName: "keyWeight",
    weights: (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).keyProjectionWeights,
    bias: new Array(8).fill(0)
  }),
  $1193f60a44983e43$var$tokenLayer({
    functionName: "valueProject",
    scaleName: "valueWeight",
    weights: (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports)).valueProjectionWeights,
    bias: new Array(8).fill(0)
  }),
  $1193f60a44983e43$var$queryShader,
  $1193f60a44983e43$var$headShader,
  $1193f60a44983e43$var$outputShader
].join("\n");
var $1193f60a44983e43$export$788ba311f03a5564 = $1193f60a44983e43$var$MATRIX_LAYOUTS.reduce((sum, [, field]) => sum + (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports))[field].length, 0);
var $1193f60a44983e43$export$dd4eb4d1095a3d82 = $1193f60a44983e43$var$MATRIX_LAYOUTS.reduce((sum, [, field]) => sum + (0, /* @__PURE__ */ $parcel$interopDefault($62561e92e160ec9a$exports))[field].filter((value) => value !== 0).length, 0);
var $e52378cd0f5a973d$export$57856b59f317262e = {
  uniforms: {
    "sceneDiffuse": {
      value: null
    },
    "sceneDepth": {
      value: null
    },
    "tDiffuse": {
      value: null
    },
    "projMat": {
      value: /* @__PURE__ */ new Matrix4()
    },
    "viewMat": {
      value: /* @__PURE__ */ new Matrix4()
    },
    "projectionMatrixInv": {
      value: /* @__PURE__ */ new Matrix4()
    },
    "viewMatrixInv": {
      value: /* @__PURE__ */ new Matrix4()
    },
    "cameraPos": {
      value: /* @__PURE__ */ new Vector3()
    },
    "resolution": {
      value: /* @__PURE__ */ new Vector2()
    },
    "time": {
      value: 0
    },
    "r": {
      value: 5
    },
    "blueNoise": {
      value: null
    },
    "radius": {
      value: 12
    },
    "worldRadius": {
      value: 5
    },
    "index": {
      value: 0
    },
    "poissonDisk": {
      value: []
    },
    "distanceFalloff": {
      value: 1
    },
    "near": {
      value: 0.1
    },
    "far": {
      value: 1e3
    },
    "screenSpaceRadius": {
      value: false
    }
  },
  depthWrite: false,
  depthTest: false,
  vertexShader: (
    /* glsl */
    `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}`
  ),
  fragmentShader: (
    /* glsl */
    `
		uniform sampler2D sceneDiffuse;
    uniform highp sampler2D sceneDepth;
    uniform sampler2D tDiffuse;
    uniform sampler2D blueNoise;
    uniform mat4 projectionMatrixInv;
    uniform mat4 viewMatrixInv;
    uniform vec2 resolution;
    uniform float r;
    uniform float radius;
     uniform float worldRadius;
    uniform float index;
     uniform float near;
     uniform float far;
     uniform float distanceFalloff;
    uniform bool screenSpaceRadius;
    varying vec2 vUv;

    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        highp float z_n = 2.0 * d - 1.0;
        return 2.0 * zNear * zFar / (zFar + zNear - z_n * (zFar - zNear));
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
     float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     return linearize_depth(linDepth, nearZ, farZ);
   }
   highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
     return nearZ + (farZ - nearZ) * d;
   }
   float depthToClipZ(float depth) {
     #ifdef REVERSEDEPTH
       return depth;
     #else
       return depth * 2.0 - 1.0;
     #endif
   }
   bool isBackgroundDepth(float depth) {
     #ifdef REVERSEDEPTH
       return depth == 0.0;
     #else
       return depth == 1.0;
     #endif
   }
   vec3 getWorldPosLog(vec3 posS) {
     vec2 uv = posS.xy;
     float z = posS.z;
     float nearZ =near;
     float farZ = far;
     float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
     vec4 wpos = projectionMatrixInv * clipVec;
     return wpos.xyz / wpos.w;
   }
    vec3 getWorldPos(float depth, vec2 coord) {
     #ifdef LOGDEPTH
      #ifndef ORTHO
          return getWorldPosLog(vec3(coord, depth));
      #endif
     #endif
        
        #ifdef ORTHO
          float z = depthToClipZ(depth);
          vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);
          vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
          viewSpacePosition.xyz /= viewSpacePosition.w;
          return viewSpacePosition.xyz;
        #else
          vec2 ndc = coord * 2. - 1.;
          float ndcZ = depthToClipZ(depth);
          mat4 Q = projectionMatrixInv;
          vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);
          float invW = 1.0 / (Q[2][3] * ndcZ + Q[3][3]);
          return view * invW;
        #endif
    }

#ifdef NEURAL_DENOISE
    struct NeuralToken {
        highp vec4 lo;
        highp vec4 hi;
    };

    ${0, $1193f60a44983e43$export$d75ad64dd346ec0e}

    vec3 neuralSafeNormalize(vec3 value, vec3 fallback) {
        float lengthSquared = dot(value, value);
        return lengthSquared > 1e-12 ? value * inversesqrt(lengthSquared) : fallback;
    }

    mat3 neuralLocalFrame(vec3 inputNormal) {
        vec3 frameNormal = neuralSafeNormalize(inputNormal, vec3(0.0, 0.0, 1.0));
        vec3 helper = abs(frameNormal.z) < 0.999
            ? vec3(0.0, 0.0, 1.0)
            : vec3(0.0, 1.0, 0.0);
        vec3 tangent = neuralSafeNormalize(
            cross(helper, frameNormal),
            vec3(1.0, 0.0, 0.0)
        );
        vec3 bitangent = cross(frameNormal, tangent);
        return transpose(mat3(tangent, bitangent, frameNormal));
    }

    void neuralConsumeToken(
        NeuralToken token,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken key = neuralKeyProject(token);
        NeuralToken value = neuralValueProject(token);
        vec4 score = neuralQueryScores(key) * 0.3535533905932738;
        vec4 newMaximum = max(runningMaximum, score);
        vec4 oldScale = exp(runningMaximum - newMaximum);
        vec4 newScale = exp(score - newMaximum);

        runningSummaryLo[0] = runningSummaryLo[0] * oldScale.x + value.lo * newScale.x;
        runningSummaryHi[0] = runningSummaryHi[0] * oldScale.x + value.hi * newScale.x;
        runningSummaryLo[1] = runningSummaryLo[1] * oldScale.y + value.lo * newScale.y;
        runningSummaryHi[1] = runningSummaryHi[1] * oldScale.y + value.hi * newScale.y;
        runningSummaryLo[2] = runningSummaryLo[2] * oldScale.z + value.lo * newScale.z;
        runningSummaryHi[2] = runningSummaryHi[2] * oldScale.z + value.hi * newScale.z;
        runningSummaryLo[3] = runningSummaryLo[3] * oldScale.w + value.lo * newScale.w;
        runningSummaryHi[3] = runningSummaryHi[3] * oldScale.w + value.hi * newScale.w;
        runningDenominator = runningDenominator * oldScale + newScale;
        runningMaximum = newMaximum;
    }

    void neuralEncodeTap(
        NeuralToken raw,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken first = neuralTapInput(raw);
        NeuralToken token = neuralTapOutput(first);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );
    }

    float neuralFinish(
        float baselineAO,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        vec4 raw = vec4(
            baselineAO,
            log(max(worldRadius, 1e-6)),
            log(max(distanceFalloff, 1e-6)),
            0.0
        );
        NeuralToken token = neuralEncodeGlobal(raw);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );

        vec4 inverseDenominator = 1.0 / max(runningDenominator, vec4(1e-12));
        runningSummaryLo[0] *= inverseDenominator.x;
        runningSummaryHi[0] *= inverseDenominator.x;
        runningSummaryLo[1] *= inverseDenominator.y;
        runningSummaryHi[1] *= inverseDenominator.y;
        runningSummaryLo[2] *= inverseDenominator.z;
        runningSummaryHi[2] *= inverseDenominator.z;
        runningSummaryLo[3] *= inverseDenominator.w;
        runningSummaryHi[3] *= inverseDenominator.w;

        NeuralToken head = neuralHead(runningSummaryLo, runningSummaryHi);
        return neuralOutput(head);
    }
#endif

    #include <common>
    #define NUM_SAMPLES __N8AO_DENOISE_SAMPLES__
    uniform vec2 poissonDisk[NUM_SAMPLES];
    void main() {
        const float pi = 3.14159;
        vec2 texelSize = vec2(1.0 / resolution.x, 1.0 / resolution.y);
        vec2 uv = vUv;
        vec4 data = texture2D(tDiffuse, vUv);
        float occlusion = data.r;
        float baseOcc = data.r;
        vec3 normal = data.gba * 2.0 - 1.0;
        float count = 1.0;
        float d = texture2D(sceneDepth, vUv).x;
        if (isBackgroundDepth(d)) {
          gl_FragColor = data;
          return;
        }
        vec3 worldPos = getWorldPos(d, vUv);
        float size = radius;
        float angle;
#ifdef NEURAL_DENOISE
        // The neural material is only bound for denoise iteration two.
        angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
#else
        if (index == 0.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).w * PI2;
        } else if (index == 1.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
        } else if (index == 2.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).y * PI2;
        } else {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).x * PI2;
        }
#endif

        mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        float radiusToUse = screenSpaceRadius ? distance(
          worldPos,
          getWorldPos(d, vUv +
            vec2(worldRadius, 0.0) / resolution)
        ) : worldRadius;
        float distanceFalloffToUse =screenSpaceRadius ?
        radiusToUse * distanceFalloff
    : radiusToUse * distanceFalloff * 0.2;

        float invDistance = (1.0 / distanceFalloffToUse);
#ifdef NEURAL_DENOISE
        mat3 neuralWorldToLocal = neuralLocalFrame(normal);
        float neuralInverseRadius = 1.0 / max(radiusToUse, 1e-6);
        float neuralInverseDistance = 1.0 / max(distanceFalloffToUse, 1e-6);
        vec4 neuralMaximum = vec4(-1e30);
        vec4 neuralDenominator = vec4(0.0);
        vec4 neuralSummaryLo[4];
        vec4 neuralSummaryHi[4];
        for (int query = 0; query < 4; query++) {
            neuralSummaryLo[query] = vec4(0.0);
            neuralSummaryHi[query] = vec4(0.0);
        }
#endif
        for(int i = 0; i < NUM_SAMPLES; i++) {
            vec2 offset = (rotationMatrix * poissonDisk[i]) * texelSize * size;
            vec4 dataSample = texture2D(tDiffuse, uv + offset);
            float occSample = dataSample.r;
            vec3 normalSample = dataSample.gba * 2.0 - 1.0;
            float dSample = texture2D(sceneDepth, uv + offset).x;
            vec3 worldPosSample = getWorldPos(dSample, uv + offset);
            float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));
            float rangeCheck = float(!isBackgroundDepth(dSample)) * exp(-1.0 * tangentPlaneDist * invDistance ) * max(dot(normal, normalSample), 0.0);
            occlusion += occSample * rangeCheck;
            count += rangeCheck;
#ifdef NEURAL_DENOISE
            if (!isBackgroundDepth(dSample)) {
                vec3 localDelta = (neuralWorldToLocal * (worldPosSample - worldPos))
                    * neuralInverseRadius;
                vec3 localNormal = neuralWorldToLocal
                    * neuralSafeNormalize(normalSample, vec3(0.0, 0.0, 1.0));
                NeuralToken rawTap = NeuralToken(
                    vec4(localDelta, localNormal.x),
                    vec4(
                        localNormal.y,
                        localNormal.z,
                        occSample,
                        tangentPlaneDist * neuralInverseDistance
                    )
                );
                neuralEncodeTap(
                    rawTap,
                    neuralMaximum,
                    neuralDenominator,
                    neuralSummaryLo,
                    neuralSummaryHi
                );
            }
#endif
        }
        if (count > 0.0) {
          occlusion /= count;
        }
        occlusion = clamp(occlusion, 0.0, 1.0);
        if (occlusion == 0.0) {
          occlusion = 1.0;
        }
#ifdef NEURAL_DENOISE
        occlusion = clamp(
            occlusion + neuralFinish(
                occlusion,
                neuralMaximum,
                neuralDenominator,
                neuralSummaryLo,
                neuralSummaryHi
            ),
            0.0,
            1.0
        );
#endif
        gl_FragColor = vec4(occlusion, 0.5 + 0.5 * normal);
    }
    `
  )
};
var $ff9437d9c7577f11$var$version = /* @__PURE__ */ (() => parseInt(REVISION.replace(/\D+/g, "")))();
var $ff9437d9c7577f11$export$156f6a58f569aa09 = $ff9437d9c7577f11$var$version >= 162 ? class extends WebGLRenderTarget {
  constructor(width = 1, height = 1, count = 1, options = {}) {
    super(width, height, {
      ...options,
      count
    });
    this.isWebGLMultipleRenderTargets = true;
  }
  get texture() {
    return this.textures;
  }
} : class extends WebGLRenderTarget {
  constructor(width = 1, height = 1, count = 1, options = {}) {
    super(width, height, options);
    this.isWebGLMultipleRenderTargets = true;
    const texture = this.texture;
    this.texture = [];
    for (let i = 0; i < count; i++) {
      this.texture[i] = texture.clone();
      this.texture[i].isRenderTargetTexture = true;
    }
  }
  setSize(width, height, depth = 1) {
    if (this.width !== width || this.height !== height || this.depth !== depth) {
      this.width = width;
      this.height = height;
      this.depth = depth;
      for (let i = 0, il = this.texture.length; i < il; i++) {
        this.texture[i].image.width = width;
        this.texture[i].image.height = height;
        this.texture[i].image.depth = depth;
      }
      this.dispose();
    }
    this.viewport.set(0, 0, width, height);
    this.scissor.set(0, 0, width, height);
  }
  copy(source) {
    this.dispose();
    this.width = source.width;
    this.height = source.height;
    this.depth = source.depth;
    this.scissor.copy(source.scissor);
    this.scissorTest = source.scissorTest;
    this.viewport.copy(source.viewport);
    this.depthBuffer = source.depthBuffer;
    this.stencilBuffer = source.stencilBuffer;
    if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
    this.texture.length = 0;
    for (let i = 0, il = source.texture.length; i < il; i++) {
      this.texture[i] = source.texture[i].clone();
      this.texture[i].isRenderTargetTexture = true;
    }
    return this;
  }
};

// ../../node_modules/.pnpm/@react-three+postprocessing@3.0.5_@react-three+fiber@9.7.0_@types+react@19.2.18_react-dom@19._ectgjigq7rxoocd2dekh3dprxe/node_modules/@react-three/postprocessing/dist/index.js
var G = /* @__PURE__ */ (0, import_react.createContext)(null);
var Oe = (e) => (e.getAttributes() & 2) == 2;
function ke(e) {
  let t = /* @__PURE__ */ new WeakMap();
  return {
    acquire(n, r) {
      let i = t.get(n);
      i ? (i.count++, i.forcedValue = r) : t.set(n, {
        count: 1,
        original: n[e],
        forcedValue: r
      });
    },
    release(n) {
      let r = t.get(n);
      r && --r.count <= 0 && (n[e] === r.forcedValue && (n[e] = r.original), t.delete(n));
    }
  };
}
var Ae = /* @__PURE__ */ ke("autoClear");
var je = /* @__PURE__ */ ke("toneMapping");
function Me(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    if (i instanceof Effect) {
      let a = [i];
      if (!Oe(i)) {
        let t2;
        for (; (t2 = e[r + 1]) instanceof Effect && !Oe(t2); ) a.push(t2), r++;
      }
      n.push(new EffectPass(t, ...a));
    } else i instanceof Pass && n.push(i);
  }
  return n;
}
var Ne = /* @__PURE__ */ (0, import_react.memo)(function({ children: e, camera: t, scene: n, resolutionScale: i, enabled: o = true, renderPriority: s = 1, autoClear: c = true, depthBuffer: l, enableNormalPass: u, stencilBuffer: d, multisampling: p2 = 8, frameBufferType: m = HalfFloatType, ref: h }) {
  let { gl: g, scene: y, camera: b, size: x } = useThree(), S = n || y, C = t || b, [w, T] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    Ae.acquire(g, false);
    let e2 = new EffectComposer(g, {
      depthBuffer: l,
      stencilBuffer: d,
      multisampling: p2,
      frameBufferType: m
    });
    e2.addPass(new RenderPass(S, C));
    let t2 = null, n2 = null;
    return u && (t2 = new NormalPass(S, C), t2.enabled = false, e2.addPass(t2), i !== void 0 && (n2 = new DepthDownsamplingPass({
      normalBuffer: t2.texture,
      resolutionScale: i
    }), n2.enabled = false, e2.addPass(n2))), e2.setSize(x.width, x.height), T({
      composer: e2,
      normalPass: t2,
      downSamplingPass: n2
    }), () => {
      e2.dispose(), Ae.release(g);
    };
  }, [
    C,
    g,
    l,
    d,
    p2,
    m,
    S,
    u,
    i
  ]), (0, import_react.useEffect)(() => {
    w?.composer.setSize(x.width, x.height);
  }, [w, x]), useFrame((e2, t2) => {
    if (!o || !w) return;
    let { composer: n2 } = w, r = g.autoClear;
    g.autoClear = c, d && !c && g.clearStencil(), n2.render(t2), g.autoClear = r;
  }, o ? s : 0);
  let E = (0, import_react.useRef)(null);
  (0, import_react.useLayoutEffect)(() => {
    if (!w) return;
    let { composer: e2, normalPass: t2, downSamplingPass: n2 } = w, r = [], i2 = E.current.__r3f;
    if (i2) {
      let e3 = i2.children.map((e4) => e4.object).filter((e4) => e4 instanceof Effect || e4 instanceof Pass);
      r.push(...Me(e3, C));
    }
    for (let t3 of r) e2.addPass(t3);
    return r.length && (t2 && (t2.enabled = true), n2 && (n2.enabled = true)), () => {
      for (let t3 of r) e2.removePass(t3);
      t2 && (t2.enabled = false), n2 && (n2.enabled = false);
    };
  }, [
    w,
    e,
    C
  ]), (0, import_react.useEffect)(() => (je.acquire(g, NoToneMapping), g.toneMapping = NoToneMapping, () => {
    je.release(g);
  }), [g]);
  let D = (0, import_react.useMemo)(() => w ? {
    composer: w.composer,
    normalPass: w.normalPass,
    downSamplingPass: w.downSamplingPass,
    resolutionScale: i,
    camera: C,
    scene: S
  } : null, [
    w,
    i,
    C,
    S
  ]);
  return (0, import_react.useImperativeHandle)(h, () => w?.composer, [w]), D ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(G.Provider, {
    value: D,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
      ref: E,
      children: e
    })
  }) : null;
});
var Le = 0;
var Re = /* @__PURE__ */ new WeakMap();
var ze = /* @__PURE__ */ new WeakMap();
var Be = 0;
function Ve(e) {
  let t = ze.get(e);
  return t === void 0 && (t = Be++, ze.set(e, t)), t;
}
function Q(e, t) {
  if (typeof e != "object" || !e) return e;
  if (t.has(e)) return "[Circular]";
  if (ArrayBuffer.isView(e) || e instanceof ArrayBuffer) return Ve(e);
  if (t.add(e), Array.isArray(e)) return e.map((e2) => Q(e2, t));
  let n = {};
  for (let r of Object.keys(e).sort()) n[r] = Q(e[r], t);
  return n;
}
function He(e) {
  return JSON.stringify(Q(e, /* @__PURE__ */ new WeakSet()));
}
function $(e, t) {
  return function({ ref: r, blendFunction: i = t?.blendFunction, opacity: o = t?.opacity, ...s }) {
    let c = Re.get(e);
    if (!c) {
      let t2 = `@react-three/postprocessing/${e.name}-${Le++}`;
      extend({ [t2]: e }), Re.set(e, c = t2);
    }
    let l = useThree((e2) => e2.camera), u = (0, import_react.useMemo)(() => [...t?.args ?? [], ...s.args ?? [{
      ...t,
      ...s
    }]], [He(s)]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
      camera: l,
      "blendMode-blendFunction": i,
      "blendMode-opacity-value": o,
      ...s,
      args: u,
      ref: r
    });
  };
}

// ../../packages/react/src/particles/react-bits/Dither/Dither.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;
var waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;
var ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;
var RetroEffectImpl = class extends Effect {
  constructor() {
    const uniforms = /* @__PURE__ */ new Map([
      ["colorNum", new Uniform(4)],
      ["pixelSize", new Uniform(2)]
    ]);
    super("RetroEffect", ditherFragmentShader, { uniforms });
    __publicField(this, "uniforms");
    this.uniforms = uniforms;
  }
  set colorNum(value) {
    this.uniforms.get("colorNum").value = value;
  }
  get colorNum() {
    return this.uniforms.get("colorNum").value;
  }
  set pixelSize(value) {
    this.uniforms.get("pixelSize").value = value;
  }
  get pixelSize() {
    return this.uniforms.get("pixelSize").value;
  }
};
var RetroEffect = (0, import_react2.forwardRef)((props, ref) => {
  const { colorNum, pixelSize } = props;
  const WrappedRetroEffect = $(RetroEffectImpl);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(WrappedRetroEffect, { ref, colorNum, pixelSize });
});
RetroEffect.displayName = "RetroEffect";
function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius
}) {
  const mesh = (0, import_react2.useRef)(null);
  const mouseRef = (0, import_react2.useRef)(new Vector2());
  const { viewport, size, gl } = useThree();
  const waveUniformsRef = (0, import_react2.useRef)({
    time: new Uniform(0),
    resolution: new Uniform(new Vector2(0, 0)),
    waveSpeed: new Uniform(waveSpeed),
    waveFrequency: new Uniform(waveFrequency),
    waveAmplitude: new Uniform(waveAmplitude),
    waveColor: new Uniform(new Color(...waveColor)),
    mousePos: new Uniform(new Vector2(0, 0)),
    enableMouseInteraction: new Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new Uniform(mouseRadius)
  });
  (0, import_react2.useEffect)(() => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    const currentRes = waveUniformsRef.current.resolution.value;
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
      currentRes.set(newWidth, newHeight);
    }
  }, [size, gl]);
  const prevColor = (0, import_react2.useRef)([...waveColor]);
  useFrame(({ clock }) => {
    const u = waveUniformsRef.current;
    if (!disableAnimation) {
      u.time.value = clock.getElapsedTime();
    }
    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;
    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });
  const handlePointerMove = (e) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("mesh", { ref: mesh, scale: [viewport.width, viewport.height, 1], children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("planeGeometry", { args: [1, 1] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "shaderMaterial",
        {
          vertexShader: waveVertexShader,
          fragmentShader: waveFragmentShader,
          uniforms: waveUniformsRef.current
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Ne, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RetroEffect, { colorNum, pixelSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "mesh",
      {
        onPointerMove: handlePointerMove,
        position: [0, 0, 0.01],
        scale: [viewport.width, viewport.height, 1],
        visible: false,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("planeGeometry", { args: [1, 1] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meshBasicMaterial", { transparent: true, opacity: 0 })
        ]
      }
    )
  ] });
}
function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Canvas,
    {
      className: "dither-container",
      camera: { position: [0, 0, 6] },
      dpr: 1,
      gl: { antialias: true, preserveDrawingBuffer: true },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        DitheredWaves,
        {
          waveSpeed,
          waveFrequency,
          waveAmplitude,
          waveColor,
          colorNum,
          pixelSize,
          disableAnimation,
          enableMouseInteraction,
          mouseRadius
        }
      )
    }
  );
}
export {
  Dither as default
};
