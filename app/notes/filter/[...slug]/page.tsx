import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByFilter({ params }: Props) {
  const { slug } = await params;
  const tag: string = slug[0];

  const data = await fetchNotes({
    search: "",
    page: 1,
    ...(tag && tag !== "All" && { tag }),
  });

  return <NotesClient initialData={data} tag={tag} />;
}
