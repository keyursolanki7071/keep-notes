
import type { Workspace } from "@/interfaces";
import { createNewNote, createWorkspace, deleteWorkspace, getAllWorkspaces, updateWorkspace } from "@/services/workspaceService";
import toast from "react-hot-toast";
import  {create} from "zustand";

interface WorkspaceStore {
    workspaces: Workspace[];
    createWorkspace: (name: string) => Promise<void>;
    getAllWorkspaces: () => Promise<void>;
    deleteWorkspace: (id: number) => Promise<void>;
    updateWorkspace: (id: number, name: string) => Promise<void>;
    createNote: (workspace: number, name: string) => Promise<void>;
}

const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
    workspaces: [],
    createWorkspace: async (name: string) => {
        try {
            const data = await createWorkspace(name);
            if(data) {
                set({workspaces: [ data as Workspace, ...get().workspaces]})
                toast.success('Workspace created.');
            }
        } catch (error: any) {
            toast.error(error)
        }
    },
    getAllWorkspaces: async () => {
        const data = await getAllWorkspaces();
        set({workspaces: data ?? []});
    },
    deleteWorkspace: async (id: number) => {
        try {
            await deleteWorkspace(id);
            set({workspaces: get().workspaces.filter(workspace => workspace.id !== id)})
            toast.success("Workspace deleted");
        } catch (error: any) {
            toast.error(error)
        }
    },
    updateWorkspace: async (id: number, name: string) => {
        try {

            const data = await updateWorkspace(id, name);
            const updatedList = get().workspaces.map(ws =>
                ws.id === id ? data : ws
            )
            set({workspaces: updatedList});

        } catch (error: any) {
            toast.error(error);
        }
    },
    createNote: async (workspace: number, name: string) => {
        try {
            const data = await createNewNote(workspace, name);
        } catch (error: any) {
            toast.error(error)
        }
    }
}))

export {useWorkspaceStore};