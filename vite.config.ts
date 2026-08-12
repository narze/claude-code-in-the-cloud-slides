// Slidev invalidates the `/@slidev/configs` virtual module whenever the deck
// headmatter changes. Nothing accepts that module, so Vite escalates to a full
// page reload - which throws away in-progress typing in the built-in slide
// editor. Dropping it from the update keeps the HMR patch and skips the reload.
// Headmatter changes (theme, transition, title, ...) then apply on the next
// manual refresh instead of instantly.
export default {
  plugins: [
    {
      name: 'local:no-full-reload-on-headmatter',
      handleHotUpdate(ctx: { modules: { id: string | null }[] }) {
        return ctx.modules.filter(mod => mod.id !== '/@slidev/configs')
      },
    },
  ],
}
