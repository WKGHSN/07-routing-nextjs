import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const input = await params;
  const getTagString = input.slug[0] || undefined;
  const filterTag =
    getTagString === "All" || undefined ? undefined : (getTagString as NoteTag);

  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    ...(filterTag ? { filterTag } : {}),
  });

  return <NotesClient initialData={initialData} tag={filterTag} />;
}
