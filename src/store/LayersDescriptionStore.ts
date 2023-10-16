import { createStore } from 'solid-js/store';
import { makeDefaultGraticule, makeDefaultSphere } from '../helpers/layers';
import { debounce, unproxify } from '../helpers/common';
import {
  type Ellipse,
  type FreeDrawing,
  type LayerDescription,
  type Rectangle,
  type ScaleBar,
  LayoutFeature,
  LayoutFeatureType,
  DistanceUnit,
  ScaleBarStyle,
} from '../global.d';
import { debouncedPushUndoStack, resetRedoStackStore } from './stateStackStore';

type LayersDescriptionStoreType = {
  layers: LayerDescription[],
  layoutFeatures: LayoutFeature[],
};

const defaultLayersDescription = (): LayersDescriptionStoreType => ({
  layers: [
    makeDefaultGraticule(),
    makeDefaultSphere(),
  ],
  layoutFeatures: [
    {
      id: 'abc123',
      type: LayoutFeatureType.Rectangle,
      position: [200, 200],
      width: 100,
      height: 200,
      fillColor: 'green',
      strokeColor: 'black',
      strokeWidth: 2,
      fillOpacity: 0.7,
      strokeOpacity: 1,
      cornerRadius: 0,
      rotation: 90,
    } as Rectangle,
    {
      id: 'abc456',
      type: LayoutFeatureType.Ellipse,
      position: [450, 450],
      rx: 100,
      ry: 200,
      fillColor: 'red',
      strokeColor: 'black',
      strokeWidth: 2,
      fillOpacity: 0.5,
      strokeOpacity: 1,
      cornerRadius: 0,
      rotation: 0,
    } as Ellipse,
    {
      id: 'abc789',
      type: LayoutFeatureType.FreeDrawing,
      position: [100, 100],
      // eslint-disable-next-line max-len
      path: 'M189.5,209.906C189.5,209.906,193.97,215.647,197,217.906C200.352,220.405,205.179,221.583,209,223.906C212.848,226.245,216.188,229.418,220,231.906C223.852,234.421,228.037,236.432,232,238.906C236.038,241.427,240.114,244.199,244,246.906C247.774,249.535,251.226,252.278,255,254.906C258.886,257.613,263.034,260.509,267,262.906C270.696,265.141,274.56,266.827,278,268.906C281.196,270.838,284,272.906,287,274.906C290,276.906,293.075,279.018,296,280.906C298.732,282.67,301.297,284.39,304,285.906C306.632,287.382,309.405,288.703,312,289.906C314.394,291.017,316.808,291.719,319,292.906C321.133,294.062,322.867,295.751,325,296.906C327.192,298.094,329.83,299.232,332,299.906C333.776,300.458,335.355,300.417,337,300.906C338.69,301.409,340.301,302.579,342,302.906C343.637,303.221,345.193,302.906,347,302.906C349.138,302.906,351.764,303.091,354,302.906C356.084,302.734,358.019,302.398,360,301.906C362.02,301.405,364.029,300.723,366,299.906C368.03,299.065,370.035,298.047,372,296.906C374.037,295.724,376.159,294.415,378,292.906C379.823,291.412,381.157,289.613,383,287.906C385.104,285.958,387.869,284.181,390,281.906C392.219,279.537,394.477,276.686,396,273.906C397.408,271.336,397.883,268.634,399,265.906C400.199,262.977,401.994,259.957,403,256.906C403.973,253.954,404.66,251.005,405,247.906C405.354,244.68,405,241.24,405,237.906C405,234.573,405.328,231.223,405,227.906C404.668,224.556,403.684,221.148,403,217.906C402.349,214.824,401.856,211.789,401,208.906C400.176,206.131,399.068,203.356,398,200.906C397.054,198.736,396,196.906,395,194.906C394,192.906,392.948,190.539,392,188.906C391.305,187.709,390.506,186.941,390,185.906C389.526,184.937,389.432,183.606,389,182.906C388.711,182.439,388.132,181.82,388,181.906C387.39,182.306,395.776,203.503,399,209.906C400.805,213.492,402.668,215.077,404,217.906C405.336,220.743,405.878,223.844,407,226.906C408.195,230.169,410.003,233.441,411,236.906C412.016,240.436,412.668,244.225,413,247.906C413.329,251.558,413,255.327,413,258.906C413,262.319,413.179,265.666,413,268.906C412.829,271.99,412.726,274.801,412,277.906C411.174,281.437,409.396,285.446,408,288.906C406.719,292.08,405.48,294.939,404,297.906C402.487,300.94,400.979,304.093,399,306.906C396.989,309.765,394.5,312.406,392,314.906C389.5,317.406,386.78,319.612,384,321.906C381.121,324.282,378.081,326.87,375,328.906C372.073,330.841,369.212,332.441,366,333.906C362.575,335.469,358.631,337.078,355,337.906C351.636,338.673,348.337,338.74,345,338.906C341.671,339.072,338.329,339.072,335,338.906C331.663,338.74,328.073,338.795,325,337.906C322.101,337.068,319.522,335.424,317,333.906C314.527,332.417,312.294,330.703,310,328.906C307.625,327.046,305.434,325.161,303,322.906C300.14,320.257,296.369,317.194,294,313.906C291.779,310.825,290.54,307.169,289,303.906C287.555,300.844,285.997,298.043,285,294.906C283.985,291.714,283.501,288.252,283,284.906C282.503,281.585,282.162,278.156,282,274.906C281.847,271.831,281.673,268.888,282,265.906C282.331,262.888,283.486,259.727,284,256.906C284.45,254.436,284.301,252.335,285,249.906C285.825,247.04,287.593,243.685,289,240.906C290.273,238.392,291.529,236.203,293,233.906C294.52,231.534,296.159,229.079,298,226.906C299.828,224.748,301.763,223.015,304,220.906C306.664,218.394,309.833,214.947,313,212.906C315.864,211.061,319,210.24,322,208.906C325,207.573,327.883,206.061,331,204.906C334.209,203.717,337.488,202.722,341,201.906C344.791,201.025,348.986,200.238,353,199.906C356.986,199.576,361,199.906,365,199.906C369,199.906,372.932,199.595,377,199.906C381.259,200.232,385.773,201.055,390,201.906C394.1,202.732,397.856,203.796,402,204.906C406.497,206.11,411.426,207.549,416,208.906C420.42,210.218,424.629,211.302,429,212.906C433.625,214.603,438.154,216.961,443,218.906C448.132,220.967,453.947,222.987,459,224.906C463.562,226.639,467.603,228.119,472,229.906C476.598,231.775,481.305,234.064,486,235.906C490.639,237.727,495.505,239.355,500,240.906C504.146,242.337,508.071,243.717,512,244.906C515.73,246.036,519.406,247.058,523,247.906C526.399,248.709,529.844,249.394,533,249.906C535.807,250.362,538.417,250.745,541,250.906C543.406,251.056,545.673,251.072,548,250.906C550.339,250.74,552.779,250.431,555,249.906C557.1,249.41,559.135,248.764,561,247.906C562.791,247.083,564.299,245.75,566,244.906C567.635,244.095,569.572,244.065,571,242.906C572.653,241.565,573.535,238.868,575,236.906C576.524,234.865,578.662,233.089,580,230.906C581.321,228.751,581.966,226.135,583,223.906C583.97,221.814,585.495,220.047,586,217.906C586.516,215.72,586,213.317,586,210.906C586,208.329,586,205.651,586,202.906C586,199.995,586.623,196.842,586,193.906C585.348,190.836,583.229,187.722,582,184.906C580.919,182.43,580.347,180.237,579,177.906C577.456,175.236,575.042,172.452,573,169.906C571.039,167.462,569.233,165.162,567,162.906C564.602,160.484,561.74,158.323,559,155.906C556.083,153.334,553.234,150.096,550,147.906C546.884,145.797,543.228,144.609,540,142.906C536.903,141.273,534.064,139.254,531,137.906C528.059,136.612,525,135.906,522,134.906C519,133.906,515.944,132.574,513,131.906C510.286,131.291,507.667,131.24,505,130.906C502.333,130.573,499.583,130.067,497,129.906C494.594,129.756,492.327,129.741,490,129.906C487.661,130.072,485.317,130.412,483,130.906C480.649,131.407,478.121,132.181,476,132.906C474.176,133.53,472.523,134.051,471,134.906C469.533,135.731,468.333,136.906,467,137.906C465.667,138.906,464.306,139.569,463,140.906C461.287,142.66,459.356,145.497,458,147.906C456.725,150.173,455.973,152.483,455,154.906C453.97,157.472,452.506,160.113,452,162.906C451.48,165.773,452,168.906,452,171.906C452,174.906,451.847,177.831,452,180.906C452.162,184.156,452.521,187.503,453,190.906C453.505,194.495,454.214,198.096,455,201.906C455.858,206.068,456.813,210.687,458,214.906C459.156,219.014,460.667,222.906,462,226.906C463.333,230.906,464.71,234.738,466,238.906C467.384,243.379,468.796,248.41,470,252.906C471.11,257.051,472.153,260.98,473,264.906C473.805,268.639,474.499,272.228,475,275.906C475.497,279.562,475.834,283.236,476,286.906C476.166,290.569,476,294.327,476,297.906C476,301.319,476.328,304.589,476,307.906C475.668,311.256,475.058,314.824,474,317.906C473.01,320.793,471.176,323.208,470,325.906C468.85,328.543,468.408,331.336,467,333.906C465.477,336.686,463.246,339.317,461,341.906C458.611,344.66,455.745,347.161,453,349.906C450.088,352.818,447.087,356.181,444,358.906C441.078,361.486,438.422,363.614,435,365.906C430.93,368.632,425.702,371.39,421,373.906C416.367,376.385,411.82,378.91,407,380.906C402.155,382.913,397.089,384.263,392,385.906C386.761,387.598,381.549,389.742,376,390.906C370.233,392.116,364.007,392.406,358,392.906C352.007,393.405,345.826,393.745,340,393.906C334.512,394.059,329.629,394.047,324,393.906C317.703,393.749,310.472,393.605,304,392.906C297.822,392.239,291.674,391.316,286,389.906C280.718,388.594,275.802,386.629,271,384.906C266.493,383.289,262.203,381.76,258,379.906C253.875,378.087,249.572,376.325,246,373.906C242.616,371.615,239.822,368.37,237,365.906C234.531,363.751,232.333,362.198,230,359.906C227.333,357.287,224.317,354.201,222,350.906C219.636,347.546,217.771,343.296,216,339.906C214.503,337.042,212.668,334.735,212,331.906C211.33,329.069,212,325.906,212,322.906C212,319.906,211.553,316.952,212,313.906C212.481,310.626,213.975,307.144,215,303.906C215.977,300.82,216.532,297.708,218,294.906C219.507,292.03,222,289.573,224,286.906C226,284.24,227.728,281.669,230,278.906C232.635,275.702,235.561,272.09,239,268.906C242.798,265.391,247.702,261.987,252,258.906C256.031,256.017,259.691,253.688,264,250.906C268.929,247.724,274.664,243.805,280,240.906C284.998,238.191,289.846,236.322,295,233.906C300.491,231.333,306.209,228.392,312,225.906C317.872,223.386,324.003,220.584,330,218.906C335.67,217.32,341.239,216.734,347,215.906C352.901,215.059,358.912,214.404,365,213.906C371.24,213.396,377.841,213.068,384,212.906C389.822,212.753,395.355,212.412,401,212.906C406.689,213.404,412.422,214.891,418,215.906C423.417,216.892,428.537,217.638,434,218.906C439.852,220.265,446.049,221.928,452,223.906C458.051,225.918,463.74,228.647,470,230.906C476.702,233.325,483.961,234.919,491,237.906C498.621,241.14,506.234,245.939,514,249.906C521.898,253.941,529.607,257.782,538,261.906C547.195,266.424,556.853,271.138,567,275.906C578.093,281.119,590.207,286.756,602,291.906C613.872,297.091,625.943,302.221,638,306.906C649.944,311.548,662.236,315.822,674,319.906C685.215,323.8,695.76,327.756,707,330.906C718.419,334.106,731.18,336.63,742,338.906C751.291,340.861,759.866,343.131,768,343.906C775.069,344.58,782.064,344.36,788,343.906C792.814,343.538,801,341.906,801,341.906',
      strokeColor: 'blue',
      strokeOpacity: 0.8,
      strokeWidth: 3,
    } as FreeDrawing,
    {
      id: 'abc012',
      type: LayoutFeatureType.ScaleBar,
      position: [100, 100],
      width: 500,
      height: 10,
      distance: 200,
      rotation: 0,
      unit: DistanceUnit.km,
      label: 'Kilometers',
      tickValues: [0, 50, 100, 250, 500],
      tickPadding: 10,
      style: ScaleBarStyle.blackAndWhiteBar,
    } as ScaleBar,
  ],
});

const [
  layersDescriptionStore,
  setLayersDescriptionStoreBase,
] = createStore(defaultLayersDescription());

/**
 * This is a wrapper around the setLayersDescriptionStoreBase function.
 * The wrapper is used to push the current state to the undo stack
 * before actually updating the store.
 */
const setLayersDescriptionStore = (...args: any[]) => {
  // Push the current state to the (undo) state stack
  debouncedPushUndoStack('layersDescription', unproxify(layersDescriptionStore));
  // Reset the redo stack
  resetRedoStackStore();
  // Apply the changes to the store
  setLayersDescriptionStoreBase(...args);
};

export {
  layersDescriptionStore,
  setLayersDescriptionStore,
  defaultLayersDescription,
  setLayersDescriptionStoreBase,
};
