import type { Note, Workspace } from "@/interfaces";
import {
  createNewNote,
  createWorkspace,
  deleteNote,
  deleteWorkspace,
  getAllFavNotes,
  getAllWorkspaces,
  getNote,
  markAsFavourite,
  updateNoteContent,
  updateWorkspace,
} from "@/services/workspaceService";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ActiveNote {
  id: number;
  name: string;
  workspace_id: number;
  favourite: boolean;
}

interface WorkspaceStore {
  workspaces: Workspace[];
  favouriteNotes: Note[];
  activeNote: ActiveNote | null;
  setActiveNote: (note: ActiveNote | null) => void;
  createWorkspace: (name: string) => Promise<void>;
  getAllWorkspaces: () => Promise<void>;
  deleteWorkspace: (id: number) => Promise<void>;
  updateWorkspace: (id: number, name: string) => Promise<void>;
  createNote: (workspace: number, name: string) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  getNote: (id: number) => Promise<Note>;
  markAsFavourite: (id: number, favourite: boolean) => Promise<Note>;
  getFavouriteNotes: () => Promise<Note[]>;
  updateNoteContent: (id: number, content: string) => Promise<void>;
}

const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  workspaces: [],
  activeNote: null,
  favouriteNotes: [],
  setActiveNote: (note: ActiveNote | null) => set({activeNote: note}),
  createWorkspace: async (name: string) => {
    try {
      const data = await createWorkspace(name);
      if (data) {
        set({ workspaces: [data as Workspace, ...get().workspaces] });
        toast.success("Workspace created.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  },
  getAllWorkspaces: async () => {
    const data = await getAllWorkspaces();
    set({ workspaces: data ?? [] });
  },
  deleteWorkspace: async (id: number) => {
    try {
      await deleteWorkspace(id);
      set({
        workspaces: get().workspaces.filter((workspace) => workspace.id !== id),
      });
      toast.success("Workspace deleted");
    } catch (error: any) {
      toast.error(error);
    }
  },
  updateWorkspace: async (id: number, name: string) => {
    try {
      const data = await updateWorkspace(id, name);
      const updatedList = get().workspaces.map((ws) =>
        ws.id === id ? data : ws
      );
      set({ workspaces: updatedList });
    } catch (error: any) {
      toast.error(error);
    }
  },
  createNote: async (workspace: number, name: string) => {
    try {
      const data = await createNewNote(workspace, name);
      const updatedWorkspaces = get().workspaces.map((ws) =>
        ws.id === workspace
          ? { ...ws, notes: [...ws.notes, data] }
          : ws
      );
      set({workspaces: updatedWorkspaces});
    } catch (error: any) {
      toast.error(error);
    }
  },
  deleteNote: async (id: number) => {
    try {
      await deleteNote(id);
      const workspaces = await getAllWorkspaces();
      set({workspaces: workspaces ?? []});
      set({favouriteNotes: get().favouriteNotes.filter((favNote) => favNote.id !== id)});
      toast.success('Note Deleted.');
    } catch (error: any) {
      toast.error(error);
    }
  },
  getNote: async (id: number) => {
    try {
      const data = await getNote(id);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  },
  markAsFavourite: async (id: number, favourite: boolean) => {
    try {

      const note = await markAsFavourite(id, favourite);
      const favNotes = get().favouriteNotes;
      if(favourite) {
        favNotes.push(note);
        set({favouriteNotes: favNotes});
      } else {
        set({favouriteNotes: favNotes.filter((favNote) => favNote.id !== id)});
      }
      return note;;

    } catch (error: any) {
      toast.error(error);
    }
  },
  getFavouriteNotes: async () => {
    try {
      const notes = await getAllFavNotes();
      set({favouriteNotes: notes ?? []});
      return notes ?? [];
    } catch (error: any) {
      toast.error(error);
      return [];
    }
  },
  updateNoteContent: async (id: number, content: string) => {
    try {

      const note = await updateNoteContent(id, content);

    } catch (error: any) {
      toast.error(error);
    }
  }
}));

export { useWorkspaceStore };
