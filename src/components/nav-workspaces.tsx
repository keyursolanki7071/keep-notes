import {
  ChevronRight,
  Edit,
  MoreHorizontal,
  Notebook,
  PinIcon,
  Plus,
  StarOff,
  Trash2,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import WorkspaceForm from "./workspace/workspace-form";
import React, { useState, type InputEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Workspace } from "@/interfaces";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { Input } from "./ui/input";
import NewNoteForm from "./workspace/new-note-form";
import { Link } from "react-router";

export function NavWorkspaces({ workspaces }: { workspaces: Workspace[] }) {
  const [openForm, setOpenForm] = useState(false);
  const [openNoteForm, setOpenNoteForm] = useState(false);
  const [createNoteWorkspace, setCreateNoteWorkspace] = useState<number | null>(
    null
  );
  const { isMobile } = useSidebar();
  const { deleteWorkspace, updateWorkspace } = useWorkspaceStore();
  const [editWorkspace, setEditWorkspace] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleDelete = async (id: number) => {
    await deleteWorkspace(id);
  };

  const handleUpdate = async (e: KeyboardEvent) => {
    if (e.key === "Enter" && editWorkspace) {
      await updateWorkspace(editWorkspace, updatedName);
      setEditWorkspace(null);
      setUpdatedName("");
    }
  };

  const handleCreateNote = (workspaceId: number) => {
    if (workspaceId) {
      setCreateNoteWorkspace(workspaceId);
      setOpenNoteForm(true);
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {workspaces && workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <Collapsible key={workspace.id} defaultOpen>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      {editWorkspace === workspace.id ? (
                        <Input
                          value={updatedName}
                          onBlur={() => {
                            setEditWorkspace(null);
                            setUpdatedName("");
                          }}
                          onKeyDown={handleUpdate}
                          onChange={(e) => setUpdatedName(e.target.value)}
                        ></Input>
                      ) : (
                        <span className="pl-10">
                          <span className="font-bold">{workspace.name}</span>
                        </span>
                      )}
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild hidden={true} >
                      <SidebarMenuAction
                        className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                        showOnHover
                      >
                        <ChevronRight />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <SidebarMenuAction showOnHover>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-56 rounded-lg z-[100]"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem
                            onClick={() => handleCreateNote(workspace.id)}
                          >
                            <Notebook className="text-muted-foreground"></Notebook>
                            <span>New Note</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditWorkspace(workspace.id);
                              setUpdatedName(workspace.name);
                            }}
                          >
                            <Edit className="text-muted-foreground"></Edit>
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(workspace.id)}
                          >
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuAction>
                    {workspace.notes && workspace.notes.length > 0 ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {workspace.notes.map((note) => (
                            <SidebarMenuSubItem key={note.id} >
                              <SidebarMenuSubButton asChild>
                                <Link to={`/note/${note.id}`}>
                                  <span>{note.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <span className="text-muted-foreground italic">No Notes</span>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))
            ) : (
              <SidebarMenuItem>No workspace found</SidebarMenuItem>
            )}
            <Button
              variant="ghost"
              size={"sm"}
              onClick={() => setOpenForm(true)}
            >
              <Plus />
            </Button>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <WorkspaceForm isOpen={openForm} setIsOpen={setOpenForm}></WorkspaceForm>
      <NewNoteForm
        isOpen={openNoteForm}
        setIsOpen={setOpenNoteForm}
        workspace={createNoteWorkspace}
      ></NewNoteForm>
    </>
  );
}
