import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface NotesPageProps {
  params: { slug?: string[] };
  searchParams?: { page?: string; q?: string };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const tagParam = params?.slug?.[0] || "All";
  const tag: NoteTag | undefined = tagParam === "All" ? undefined : (tagParam as NoteTag);

  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.q ?? "";

  const queryClient = getQueryClient();

  // Серверний prefetch
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}