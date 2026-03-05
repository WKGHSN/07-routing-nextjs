"use client";

import css from "./TagsMenu.module.css";
import { useState } from "react";
import { NoteTag } from "@/types/note";
import Link from "next/link";

const NOTE_TAGS: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilterMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleFilterMenu}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li key={"All"} className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={toggleFilterMenu}
            >
              All Tags
            </Link>
          </li>
          {NOTE_TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggleFilterMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
