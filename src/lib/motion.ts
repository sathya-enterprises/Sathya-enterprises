/** Motion tokens — mirror of docs/DESIGN.md §4. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0.05, 0.36, 1] as const,
};

export const dur = {
  micro: 0.16,
  ui: 0.24,
  reveal: 0.64,
  hero: 1,
};

export const stagger = {
  list: 0.06,
  headline: 0.09,
};
