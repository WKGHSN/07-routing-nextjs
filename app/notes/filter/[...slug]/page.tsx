import { notFound } from "next/navigation";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import NotesPageClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { TAGS } from "@/types/note";

interface NotesByCategoryParams {
  slug: string[];
}

export default async function NotesByCategory({
  params,
}: {
  params: Promise<NotesByCategoryParams>;
}) {
  const { slug } = await params;
  const filter = slug[0];

  const queryClient = new QueryClient();

  const isNoteTag = (value: string): value is NoteTag =>
    TAGS.includes(value as NoteTag);

  if (filter === "all") {
    await queryClient.prefetchQuery({
      queryKey: ["notes", { page: 1, perPage: 12 }],
      queryFn: () =>
        fetchNotes({
          page: 1,
          perPage: 12,
        }),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesPageClient />
      </HydrationBoundary>
    );
  }

  if (isNoteTag(filter)) {
    await queryClient.prefetchQuery({
      queryKey: ["notes", { page: 1, perPage: 12, tag: filter }],
      queryFn: () =>
        fetchNotes({
          page: 1,
          perPage: 12,
          tag: filter,
        }),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesPageClient tag={filter} />
      </HydrationBoundary>
    );
  }

  notFound();
}