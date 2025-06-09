export interface Workspace {
  id: number;
  name: string;
  notes: Note[];
  favourite: boolean;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  workspace_id: number;
  name: string;
  content: string;
  favourite: boolean;
  created_at: string;
  updated_at: string;
}
