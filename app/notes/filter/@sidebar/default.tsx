import Link from "next/link";
const tags = ["all", "work", "personal", "meeting", "shopping"];

export default function SidebarContent() {
  return (
    <aside>
      <nav aria-label="Filter notes by tag">
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}