/**
 * Permite a usuarios que navegan por teclado 
 * saltarse la barra de navegación e ir directo
 *  al contenido principal. 
 * */

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      tabIndex={0}
      className="fixed top-4 left-4 z-50 -translate-y-24 focus:translate-y-0 transition-transform duration-200 bg-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-lg shadow-xl outline-none ring-2 ring-ring ring-offset-2"
    >
      Saltar al contenido principal
    </a>
  );
}