export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 mt-auto">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} recenzarium</span>
        <span>Współprace książkowe — bez chaosu.</span>
      </div>
    </footer>
  );
}
