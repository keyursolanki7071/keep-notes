import supabase from "./supabase"

const createWorkspace = async (name: string) => {
    const {data, error} = await supabase.from('workspaces').insert({
        name: name
    }).select().single()
    if(error) throw error.message;
    return data;
}

const getAllWorkspaces = async () => {
    const {data, error} = await supabase.from('workspaces').select(`*, notes (*)`);
    if(error) error.message;
    return data;
}

const deleteWorkspace = async (id: number) => {
    const {data, error} = await supabase.from('workspaces').delete().eq('id', id);
    if(error) {
        throw error.message;
    }
    return data;
}

const updateWorkspace = async (id: number, name: string) => {
    const {data, error} = await supabase.from('workspaces').update({name: name}).eq('id', id).select().single();
    if(error) {
        throw error.message;
    }
    return data;
}

const createNewNote = async (workspace: number, name: string) => {
    const {data, error} = await supabase.from('notes').insert({
        name: name,
        workspace_id: workspace
    }).select().single();
    if(error) {
        throw error.message
    }
    return data;
}

export {createWorkspace, getAllWorkspaces, deleteWorkspace, updateWorkspace, createNewNote};