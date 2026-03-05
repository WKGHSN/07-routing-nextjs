"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface Props {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load note.</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
      <p>Tag: {data?.tag}</p>
    </div>
  );
}