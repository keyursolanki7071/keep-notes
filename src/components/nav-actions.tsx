"use client"

import * as React from "react"
import {
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useWorkspaceStore } from "@/stores/useWorkspaceStore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate();

  const {activeNote, deleteNote} = useWorkspaceStore();
  const handleDelete = async () => {
    if(!activeNote) {
      toast.error('Nothing to delete');
      return false;
    }
    await deleteNote(activeNote);
    return navigate("/");
  }

  if(!activeNote) {
    return "";
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      
      <Popover open={isOpen} onOpenChange={setIsOpen} >
        <PopoverTrigger asChild >
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
                <SidebarGroup className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton onClick={handleDelete} >
                            <Trash2 /> <span>Delete</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
