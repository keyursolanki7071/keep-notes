import type { Workspace } from "@/interfaces";
import {
  createNewNote,
  createWorkspace,
  deleteNote,
  deleteWorkspace,
  getAllWorkspaces,
  updateWorkspace,
} from "@/services/workspaceService";
import toast from "react-hot-toast";
import { create } from "zustand";

interface WorkspaceStore {
  workspaces: Workspace[];
  activeNote: number | null;
  setActiveNote: (id: number | null) => void;
  createWorkspace: (name: string) => Promise<void>;
  getAllWorkspaces: () => Promise<void>;
  deleteWorkspace: (id: number) => Promise<void>;
  updateWorkspace: (id: number, name: string) => Promise<void>;
  createNote: (workspace: number, name: string) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  workspaces: [],
  activeNote: null,
  setActiveNote: (id: number | null) => set({activeNote: id}),
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
      toast.success('Note Deleted.');
    } catch (error: any) {
      toast.error(error);
    }
  }
}));

export { useWorkspaceStore };
