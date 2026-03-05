import axios from "axios";
import type { Note, NoteTag } from "@/types/note.ts";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const NOTES_ENDPOINT = "/notes";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers: Record<string, string> = { "Content-Type": "application/json" };
if (token) headers.Authorization = `Bearer ${token}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers,
});

interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  tag?: NoteTag;
}

type FetchNotesResponse = {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes?: number;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  try {
    const response = await axiosInstance.get<FetchNotesResponse>(NOTES_ENDPOINT, { params });
    return response.data;
  } catch (err) {
    console.error("fetchNotes error:", err);
    throw err;
  }
};

export const createNote = async (note: { title: string; content: string; tag: NoteTag }): Promise<Note> => {
  try {
    const response = await axiosInstance.post<Note>(NOTES_ENDPOINT, note);
    return response.data;
  } catch (err) {
    console.error("createNote error:", err);
    throw err;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axiosInstance.delete<Note>(`${NOTES_ENDPOINT}/${id}`);
    return response.data;
  } catch (err) {
    console.error("deleteNote error:", err);
    throw err;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axiosInstance.get<Note>(`${NOTES_ENDPOINT}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`fetchNoteById error (id=${id}):`, err);
    throw err;
  }
};