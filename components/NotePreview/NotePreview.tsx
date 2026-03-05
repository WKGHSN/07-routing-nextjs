"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "../Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;
  // if (isError) return <p>Something went wrong.</p>;

  if (isSuccess)
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.closeButn} onClick={handleClose}>
              &times;
            </button>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Modal>
    );
}
