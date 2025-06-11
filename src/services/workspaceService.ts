import supabase from "./supabase"

const WORKSPACE_SELECT = `*, notes (*)`;

const createWorkspace = async (name: string) => {
    const {data, error} = await supabase.from('workspaces').insert({
        name: name
    }).select(WORKSPACE_SELECT).single()
    if(error) throw error.message;
    return data;
}

const getAllWorkspaces = async () => {
    const {data, error} = await supabase.from('workspaces').select(WORKSPACE_SELECT);
    if(error) error.message;
    return data;
}

const deleteWorkspace = async (id: number) => {
    const {data, error} = await supabase.from('workspaces').delete().eq('id', id);
    if(error) throw error.message;
    
    return data;
}

const updateWorkspace = async (id: number, name: string) => {
    const {data, error} = await supabase.from('workspaces').update({name: name}).eq('id', id).select(WORKSPACE_SELECT).single();
    if(error) throw error.message;
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

const deleteNote = async (id: number) => {
    const {data, error} = await supabase.from('notes').delete().eq('id', id);
    if(error) throw error.message;
    return data;
}

const getNote = async (id: number) => {
    const {data,error} = await supabase.from('notes').select("*").eq('id', id).single();
    if(error) throw error.message;
    
    return data;
}

const markAsFavourite = async (id: number, favourite: boolean) => {
    const {data, error} = await supabase.from('notes').update({favourite: favourite}).eq('id', id).select().single();
    if(error) throw error.message;
    return data;
}

const getAllFavNotes = async () => {
    const {data, error} = await supabase.from('notes').select(`*`).eq('favourite', true);
    if(error) error.message;
    return data;
}

const updateNoteContent = async (id: number, content: string) => {
    const {data, error} = await supabase.from('notes').update({
        "content" : content
    }).eq("id", id).single();
    if(error) throw error.message;
    return data;
}

export {createWorkspace, getAllWorkspaces, deleteWorkspace, updateWorkspace, createNewNote, deleteNote, getNote, markAsFavourite, getAllFavNotes, updateNoteContent};