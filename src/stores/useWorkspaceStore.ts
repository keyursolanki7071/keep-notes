
import type { Workspace } from "@/interfaces";
import { createWorkspace, deleteWorkspace, getAllWorkspaces } from "@/services/workspaceService";
import toast from "react-hot-toast";
import  {create} from "zustand";

interface WorkspaceStore {
    workspaces: Workspace[];
    createWorkspace: (name: string) => Promise<void>;
    getAllWorkspaces: () => Promise<void>;
    deleteWorkspace: (id: number) => Promise<void>;
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
    }
}))

export {useWorkspaceStore};