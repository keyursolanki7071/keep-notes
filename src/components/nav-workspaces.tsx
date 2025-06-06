import {
  ChevronRight,
  MoreHorizontal,
  Notebook,
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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import { deleteWorkspace } from "@/services/workspaceService";

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
}) {
  const [openForm, setOpenForm] = useState(false);
  const { isMobile } = useSidebar();

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkspace(id);
      toast.success("Workspace deleted.");
    } catch (error: any) {
      toast.error(error);
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
                <Collapsible key={workspace.name}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <span>{workspace.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
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
                          className="w-56 rounded-lg"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem>
                            <Notebook className="text-muted-foreground"></Notebook>
                            <span>Add Note</span>
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
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {/* {workspace.pages.map((page) => (
                        <SidebarMenuSubItem key={page.name}>
                          <SidebarMenuSubButton asChild>
                            <a href="#">
                              <span>{page.emoji}</span>
                              <span>{page.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))} */}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))
            ) : (
              <SidebarMenuItem>
                No workspace found
              </SidebarMenuItem>
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
    </>
  );
}
