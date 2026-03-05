import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";

export default function header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.navigationLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
