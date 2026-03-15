import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>© 2026 NoteHub. All rights reserved.</p>
      <p>Developer: WKGHSN</p>
      <p>
        Contact us:{" "}
        <a href="mailto:korostelovanatalia66@gmail.com">mailto:korostelovanatalia66@gmail.com</a>
      </p>
    </footer>
  );
}