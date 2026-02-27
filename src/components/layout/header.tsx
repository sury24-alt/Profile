import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-10">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
          Surya Teja.
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="#hero" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
