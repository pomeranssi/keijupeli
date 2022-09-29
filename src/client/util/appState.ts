export function isStandaloneApp() {
  return Boolean(window.matchMedia('(display-mode: standalone)').matches);
}
