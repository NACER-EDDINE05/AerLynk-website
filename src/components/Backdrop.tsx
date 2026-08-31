/**
 * Atmosphere backdrop: drifting aurora glows, a fading grid, and film noise —
 * the same three layers the desktop app paints behind its UI.
 * Purely decorative; fixed within its positioned parent.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="aurora" />
      <div className="grid-veil" />
      <div className="noise-veil" />
    </div>
  );
}
