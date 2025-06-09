import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Note } from "@/interfaces";
import { useNavigate } from "react-router";

export function NavFavorites({ notes }: { notes: Note[] }) {
  const navigate = useNavigate();

  if (notes && notes.length > 0) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        <SidebarMenu>
          {notes.map((item) => (
            <SidebarMenuItem key={item.id} onClick={() => navigate(`/note/${item.id}`)} className="cursor-pointer">
              <SidebarMenuButton asChild>
               <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return "";
}
