import * as React from "react";
import { NavFavorites } from "@/components/nav-favorites";
import { NavWorkspaces } from "@/components/nav-workspaces";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaces, getAllWorkspaces, favouriteNotes, getFavouriteNotes } =
    useWorkspaceStore();
  React.useEffect(() => {
    getAllWorkspaces();
    getFavouriteNotes();
  }, []);

  return (
    <Sidebar className="border-r-0" {...props}>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton asChild>
                <Link to={"/"} title="Home">
                  <HomeIcon></HomeIcon><span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavFavorites notes={favouriteNotes} />
        <NavWorkspaces workspaces={workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
