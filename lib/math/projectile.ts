/** Standard gravity used in the projectile demonstration (SI). */
export const G = 9.81;

export function projectileHeight(t: number, y0: number, u: number) {
  return y0 + u * t - 0.5 * G * t * t;
}

/**
 * First time t ≥ 0 at which y(t) = 0, for y₀ ≥ 0.
 * y = y₀ + u t − ½ g t² = 0  ⇒  t = [u ± √(u² + 2 g y₀)] / g.
 * The physical landing time is the “+” branch, which is ≥ 0.
 * If the object starts on the ground with u ≤ 0, the landing time is 0.
 */
export function projectileLandingTime(y0: number, u: number) {
  if (y0 < 0) return 0;
  const disc = u * u + 2 * G * y0;
  if (disc < 0) return 0;
  const t = (u + Math.sqrt(disc)) / G;
  return t > 1e-12 ? t : 0;
}

/** Time of maximum height. If u ≤ 0 the object is not thrown up, so the peak is at release. */
export function projectilePeakTime(u: number) {
  return u > 0 ? u / G : 0;
}

export function projectilePeakHeight(y0: number, u: number) {
  if (u > 0) return y0 + (u * u) / (2 * G);
  return Math.max(0, y0);
}
