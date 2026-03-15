"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type NotePreviewClientProps = Record<string, never>;

const NotePreviewClient = ({}: NotePreviewClientProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => router.back();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = `Created at: ${new Date(
    note.createdAt
  ).toLocaleDateString()}`;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <p className={css.tag}>{note.tag}</p>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>

        <button
          type="button"
          className={css.backBtn}
          onClick={handleClose}
        >
          Back
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;