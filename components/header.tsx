import Link from "next/link"

const navItems = ["home", "about", "projects", "experience", "research", "contact"]

export default function Header() {
  return <header className="floating-nav"><nav>{navItems.map((item) => <Link href={`#${item}`} key={item}>{item}</Link>)}</nav></header>
}
