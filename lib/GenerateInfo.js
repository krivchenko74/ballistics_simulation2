import degToRad from "./degToRad";

export default function GenerateInfo(v, a, g, x, y) {
  const rads = degToRad(a);
  const flightTime =
    (v * Math.sin(rads) + Math.sqrt(v ** 2 * Math.sin(rads) ** 2 + 2 * g * y)) /
    g;
  const maxHeight = y + (v ** 2 * Math.sin(rads) ** 2) / 2 / g;
  const flightLength = (v ** 2 * Math.sin(2 * rads)) / g;
  const dots = [];
  for (let t = 0; t < flightTime; t += 0.01) {
    const newX = v * Math.cos(rads) * t;
    const newY = y + v * Math.sin(rads) * t - (g * t ** 2) / 2;
    dots.push([newX, newY]);
  }
  return { flightTime, maxHeight, flightLength, dots };
}
