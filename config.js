// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is chasing your own split on one short track fun enough to restart twenty times?
// Date: 2026-11-17
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- The car: speed --------------------------------------------------------------------
  topSpeed: { value: 58, min: 30, max: 90, step: 1 },          // m/s on the road (58 is 209 km/h)
  accel: { value: 15, min: 5, max: 30, step: 0.5 },            // m/s2 from a standstill, fading to 0 at top speed
  brake: { value: 30, min: 10, max: 50, step: 1 },             // m/s2 on the brake
  coast: { value: 3, min: 0, max: 10, step: 0.5 },             // m/s2 lost with no pedal held
  reverseMax: { value: 9, min: 3, max: 20, step: 1 },          // m/s top speed backwards
  reverseAccel: { value: 10, min: 3, max: 20, step: 1 },       // m/s2 backwards

  // ---- The car: steering and grip ----------------------------------------------------------
  steerRate: { value: 5, min: 1, max: 12, step: 0.5 },         // per second: how fast the wheel reaches full lock
  steerReturn: { value: 9, min: 1, max: 20, step: 0.5 },       // per second: how fast it centres again
  turnMax: { value: 2.3, min: 1, max: 4, step: 0.1 },          // rad/s: the tightest turn, at low speed
  latGrip: { value: 21, min: 8, max: 40, step: 0.5 },          // m/s2 cornering grip: corner speed is sqrt(latGrip x radius)
  grip: { value: 9, min: 2, max: 20, step: 0.5 },              // per second: how fast a slide straightens when not drifting
  slideKeep: { value: 0.8, min: 0, max: 1, step: 0.01 },       // 0-1: speed kept while a slide straightens

  // ---- The car: the drift (hold Space) -----------------------------------------------------
  driftLat: { value: 31, min: 15, max: 50, step: 0.5 },        // m/s2 cornering while drifting: what makes a drift tighter than grip
  driftGrip: { value: 2.6, min: 0.5, max: 8, step: 0.1 },      // per second: how fast the slide straightens while drifting (lower slides more)
  driftKeep: { value: 0.93, min: 0.5, max: 1, step: 0.01 },    // 0-1: speed kept through the slide
  driftMinSpeed: { value: 9, min: 0, max: 30, step: 1 },       // m/s: no drift below this
  driftIn: { value: 7, min: 1, max: 20, step: 0.5 },           // per second: how fast the drift takes hold
  driftOut: { value: 3.5, min: 1, max: 20, step: 0.5 },        // per second: how fast it lets go when Space is released

  // ---- Off the road, hills and the jump -----------------------------------------------------
  grassSpeed: { value: 13, min: 4, max: 30, step: 1 },         // m/s: the speed grass drags the car down to
  grassBrake: { value: 20, min: 5, max: 40, step: 1 },         // m/s2: how hard grass slows a fast car
  grassGrip: { value: 0.55, min: 0.2, max: 1, step: 0.05 },    // x grip on grass
  gravity: { value: 14, min: 6, max: 25, step: 0.5 },          // m/s2: heavier than real, so jumps are short
  slopePull: { value: 0.5, min: 0, max: 1, step: 0.05 },       // 0-1: how much a slope speeds or slows the car
  airSteer: { value: 0.35, min: 0, max: 1.5, step: 0.05 },     // rad/s: turning in the air
  roadHalfWidth: { value: 7, min: 5, max: 10, step: 0.5 },     // m: half the road's width (read once, when the track is laid)

  // ---- The camera ---------------------------------------------------------------------------
  camDist: { value: 6.6, min: 4, max: 12, step: 0.2 },         // m behind the car
  camPull: { value: 1.6, min: 0, max: 5, step: 0.2 },          // m further back at top speed
  camHeight: { value: 2.7, min: 1.5, max: 6, step: 0.1 },      // m above the car
  camLag: { value: 5, min: 1, max: 15, step: 0.5 },            // per second: how fast the camera swings round behind
  camSlip: { value: 0.45, min: 0, max: 1, step: 0.05 },        // 0-1: how far the camera looks along the slide, not the nose
  fovMin: { value: 62, min: 45, max: 80, step: 1 },            // degrees, standing still
  fovMax: { value: 86, min: 60, max: 110, step: 1 },           // degrees, at top speed

  // ---- The run ------------------------------------------------------------------------------
  countStep: { value: 0.65, min: 0.2, max: 1.2, step: 0.05 },        // s for each of 3, 2, 1 on the first start
  restartCountStep: { value: 0.3, min: 0.1, max: 1, step: 0.05 },    // s for each of 3, 2, 1 after R
  sinkTime: { value: 0.9, min: 0.2, max: 3, step: 0.1 },             // s in the sea before the car is put back

  // ---- Medals: each is the estimated clean run (worked out from the track and the car) x this ----
  medalAuthor: { value: 0.97, min: 0.8, max: 1.2, step: 0.01 },
  medalGold: { value: 1.04, min: 0.9, max: 1.4, step: 0.01 },
  medalSilver: { value: 1.15, min: 1, max: 1.8, step: 0.01 },
  medalBronze: { value: 1.45, min: 1.1, max: 3, step: 0.05 },

  // ---- Marks and sound ----------------------------------------------------------------------
  markSlip: { value: 0.16, min: 0.05, max: 0.6, step: 0.01 },  // rad of slide before the tyres mark the road
  mapRange: { value: 260, min: 120, max: 600, step: 20 },      // m of road the minimap shows ahead of the car
  engineVol: { value: 0.5, min: 0, max: 1, step: 0.05 },
  windVol: { value: 0.35, min: 0, max: 1, step: 0.05 },
  skidVol: { value: 0.3, min: 0, max: 1, step: 0.05 },
};
