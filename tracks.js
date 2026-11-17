// PROTOTYPE - NOT FOR PRODUCTION
// Trackmanus: the twenty tracks. Each is a list of pieces laid end to end from the start line.
//   ['s', length m, height change m]                          a straight
//   ['a', radius m, angle deg (+ turns right), height change m, bank deg]   a bend
// A bank above 0 leans the road into the bend; below 0 leans it out (off camber).
// y0 is the height of the start line, h0 the compass the start points along (0 east, 90 south:
// the sea lies south and east), marg how far the cliff edge stands off the road.
// Every track starts and ends on a straight, and never crosses itself.
window.TRACKS = [
  { id: 'first-light', name: 'First Light', y0: 96, cps: [[4, 20], [8, 8], [12, 25]], pieces: [
    ['s', 220, -6],            // 0  the start straight: the throttle
    ['a', 160, 40, -5],        // 1  a wide bend: steering
    ['s', 80, -4],             // 2
    ['a', 70, -70, -4],        // 3  a tighter bend: the brake
    ['s', 110, -5],            // 4  checkpoint 1 near its end
    ['a', 24, 180, -6],        // 5  the downhill hairpin: the first drift
    ['s', 140, -8],            // 6
    ['a', 100, -60, -5, 10],   // 7  the banked bend
    ['s', 60, -3],             // 8  checkpoint 2
    ['a', 70, 55, -3],         // 9  an S...
    ['a', 70, -35, -2],        // 10
    ['a', 80, 80, -5],         // 11 ...that swings round to the west
    ['s', 130, -6],            // 12 checkpoint 3 near its end
    ['a', 26, -170, -6],       // 13 the second hairpin
    ['s', 110, -5],            // 14
    ['s', 60, 3.5],            // 15 the kicker
    ['s', 45, -5.5],           // 16 the drop behind the crest: the jump
    ['s', 100, -3],            // 17 the landing
    ['a', 200, 25, -2],        // 18
    ['s', 150, -1],            // 19 the finish straight
  ] },
  { id: 'short-hop', name: 'Short Hop', y0: 50, pieces: [ // a sprint: two bends, one jump, one more bend
    ['s', 160, -5], ['a', 90, 60, -4], ['s', 70, -3], ['a', 50, -100, -4], ['s', 90, -3],
    ['s', 55, 3.2], ['s', 40, -5], ['s', 80, -3], ['a', 70, 75, -3], ['s', 170, -2],
  ] },
  { id: 'needle-eye', name: 'Needle Eye', y0: 44, h0: 90, pieces: [ // the shortest: two chicanes on a run to the sea
    ['s', 200, -4], ['a', 60, 45, -1], ['a', 60, -90, -2], ['a', 60, 45, -1], ['s', 150, -3],
    ['a', 40, -45, -1], ['a', 40, 90, -2], ['a', 40, -45, -1], ['s', 190, -3],
  ] },
  { id: 'horseshoe', name: 'Horseshoe', y0: 56, pieces: [ // one long bend that tightens, then a jump at full speed
    ['s', 250, -5], ['a', 220, 60, -4], ['a', 150, 120, -8, 6], ['s', 120, -3],
    ['s', 60, 3.5], ['s', 45, -5.5], ['s', 170, -3],
  ] },
  { id: 'long-sweep', name: 'Long Sweep', y0: 76, h0: -20, pieces: [ // wide bends, hardly a brake
    ['s', 200, -4], ['a', 220, 50, -4], ['s', 100, -2], ['a', 180, -80, -5], ['s', 120, -3],
    ['a', 160, 100, -6, 8], ['s', 150, -4], ['a', 200, -70, -4], ['s', 100, -2],
    ['a', 150, 90, -5, 8], ['s', 140, -4], ['a', 240, -60, -4], ['s', 220, -3],
  ] },
  { id: 'staircase', name: 'Staircase', y0: 70, pieces: [ // square corners, down to the south-east
    ['s', 150, -4], ['a', 30, 90, -3], ['s', 90, -4], ['a', 30, -90, -3], ['s', 110, -4],
    ['a', 30, 90, -3], ['s', 80, -4], ['a', 30, -90, -3], ['s', 120, -4], ['a', 30, 90, -3],
    ['s', 90, -4], ['a', 30, -90, -3], ['s', 190, -3],
  ] },
  { id: 'slalom', name: 'Slalom', y0: 62, pieces: [ // left, right, left: a wide weave, then a tight one
    ['s', 140, -3], ['a', 55, 55, -2], ['a', 55, -110, -3], ['a', 55, 110, -3], ['a', 55, -110, -3],
    ['a', 55, 110, -3], ['a', 55, -55, -2], ['s', 120, -3], ['a', 40, 60, -2], ['a', 40, -120, -3],
    ['a', 40, 120, -3], ['a', 40, -60, -2], ['s', 100, -2], ['a', 80, 90, -3], ['s', 180, -3],
  ] },
  { id: 'the-bowl', name: 'The Bowl', y0: 60, pieces: [ // three long banked bends
    ['s', 180, -4], ['a', 110, 200, -8, 14], ['s', 120, -3], ['a', 90, -190, -8, 14], ['s', 140, -3],
    ['a', 130, 150, -7, 12], ['s', 220, -3],
  ] },
  { id: 'three-crests', name: 'Three Crests', y0: 70, h0: 30, pieces: [ // three jumps, each bigger than the last
    ['s', 150, -5], ['s', 60, 3.5], ['s', 45, -5.5], ['s', 110, -5], ['a', 120, 45, -3], ['s', 80, -3],
    ['s', 60, 4], ['s', 45, -6], ['s', 120, -5], ['a', 100, -80, -4], ['s', 90, -3],
    ['s', 70, 5], ['s', 50, -7.5], ['s', 130, -6], ['a', 140, 50, -3], ['s', 170, -2],
  ] },
  { id: 'cliff-edge', name: 'Cliff Edge', y0: 52, marg: 20, pieces: [ // the sea is on the right all the way, and close
    ['s', 180, -2], ['a', 90, 50, -2], ['s', 60, -1], ['a', 60, -100, -3], ['s', 80, -2],
    ['a', 70, 95, -2], ['s', 120, -2], ['a', 45, -90, -2], ['a', 110, 75, -3], ['s', 100, -2],
    ['a', 50, -75, -2], ['s', 70, -1], ['a', 80, 45, -2], ['s', 200, -2],
  ] },
  { id: 'paperclip', name: 'Paperclip', y0: 58, pieces: [ // long straights at full speed, and a hairpin at the end of each
    ['s', 330, -6], ['a', 30, 180, -4], ['s', 300, -6], ['a', 30, -180, -4], ['s', 330, -6],
    ['a', 45, 180, -5, 10], ['s', 260, -5],
  ] },
  { id: 'switchbacks', name: 'Switchbacks', y0: 96, pieces: [ // five hairpins stacked down a hillside
    ['s', 150, -5], ['a', 28, 180, -5], ['s', 170, -7], ['a', 28, -180, -5], ['s', 190, -7],
    ['a', 28, 180, -5], ['s', 170, -7], ['a', 28, -180, -5], ['s', 190, -7], ['a', 28, 180, -5],
    ['s', 150, -6], ['a', 60, -90, -4], ['s', 160, -4],
  ] },
  { id: 'ring-road', name: 'Ring Road', y0: 64, pieces: [ // always to the right, and each corner tighter than the last
    ['s', 220, -4], ['a', 170, 90, -5], ['s', 180, -4], ['a', 110, 90, -5], ['s', 420, -7],
    ['a', 70, 90, -4], ['s', 160, -4], ['a', 40, 60, -3], ['s', 180, -3],
  ] },
  { id: 'big-dipper', name: 'Big Dipper', y0: 62, h0: -15, pieces: [ // up and down like a fairground ride
    ['s', 140, -8], ['s', 80, 6], ['s', 80, -9], ['s', 90, 7], ['a', 150, 40, -4], ['s', 70, -8],
    ['s', 70, 6], ['s', 50, -7], ['s', 110, -3], ['a', 120, -70, -3], ['s', 80, 7], ['s', 60, -8],
    ['s', 90, 5], ['s', 50, -7], ['s', 100, -3], ['a', 160, 30, -2], ['s', 180, -3],
  ] },
  { id: 'serpent', name: 'Serpent', y0: 92, h0: 90, pieces: [ // one bend runs into the next, all the way down to the sea
    ['s', 120, -4], ['a', 70, 70, -4], ['a', 70, -140, -7], ['a', 70, 140, -7], ['a', 70, -140, -7],
    ['a', 70, 140, -7], ['a', 70, -140, -7], ['a', 70, 70, -4], ['s', 80, -3], ['a', 50, -90, -4],
    ['a', 50, 180, -7], ['a', 50, -90, -4], ['s', 170, -4],
  ] },
  { id: 'the-climb', name: 'The Climb', y0: 14, pieces: [ // from the shore to the top of the hill
    ['s', 160, 6], ['a', 80, -90, 6], ['s', 120, 8], ['a', 26, -180, 5], ['s', 115, 9],
    ['a', 26, 180, 5], ['s', 160, 10], ['a', 60, 90, 5], ['s', 110, 6], ['a', 100, -60, 5, 8],
    ['s', 90, 4], ['a', 70, 120, 6], ['s', 180, 3],
  ] },
  { id: 'off-camber', name: 'Off Camber', y0: 72, pieces: [ // every bend leans the wrong way
    ['s', 170, -4], ['a', 90, 80, -4, -10], ['s', 90, -3], ['a', 70, -110, -5, -11], ['s', 110, -3],
    ['a', 120, 70, -4, -9], ['s', 70, -2], ['a', 60, 100, -5, -11], ['s', 100, -3],
    ['a', 80, -120, -5, -10], ['s', 80, -2], ['a', 50, 70, -3, -10], ['s', 180, -4],
  ] },
  { id: 'whirlpool', name: 'Whirlpool', y0: 80, pieces: [ // a spiral that tightens to a finish in the middle
    ['s', 180, -4], ['a', 230, 180, -14, 6], ['a', 180, 180, -14, 6], ['a', 130, 180, -14],
    ['a', 60, 135, -6], ['s', 110, -2],
  ] },
  { id: 'ridge', name: 'Ridge', y0: 28, pieces: [ // up one side, a jump over the top, down the other
    ['s', 150, 7], ['a', 80, -60, 6], ['a', 80, 60, 6], ['s', 100, 8], ['a', 30, 150, 6],
    ['s', 110, 9], ['a', 40, -150, 7], ['s', 90, 8], ['s', 60, 5], ['s', 50, -7], ['s', 130, -11],
    ['a', 70, 90, -8], ['s', 100, -9], ['a', 28, -180, -7], ['s', 120, -10], ['a', 50, 90, -5],
    ['s', 200, -5],
  ] },
  { id: 'marathon', name: 'Marathon', y0: 110, pieces: [ // the long one: a bit of everything
    ['s', 240, -5], ['a', 180, 60, -4], ['s', 100, -3], ['a', 60, -120, -5], ['s', 120, -4],
    ['a', 26, 180, -6], ['s', 150, -6], ['a', 120, -75, -5, 8], ['s', 80, -2],
    ['s', 60, 3.5], ['s', 45, -5.5], ['s', 110, -4], ['a', 90, 135, -6], ['s', 260, -7],
    ['a', 50, -90, -4], ['a', 50, 90, -4], ['s', 120, -3], ['a', 28, -180, -6], ['s', 200, -5],
    ['a', 100, 50, -3], ['a', 100, -50, -3], ['s', 240, -3],
  ] },
];
