import * as React from "react"
import { NavFavorites } from "@/components/nav-favorites"
import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import {useWorkspaceStore} from "@/stores/useWorkspaceStore"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {workspaces, getAllWorkspaces, favouriteNotes, getFavouriteNotes} = useWorkspaceStore();

  React.useEffect(() => {
    getAllWorkspaces();
    getFavouriteNotes();
  }, [])

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarContent>
        <NavFavorites notes={favouriteNotes} />
        <NavWorkspaces workspaces={workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
