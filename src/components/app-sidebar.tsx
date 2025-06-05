import * as React from "react"
import { NavFavorites } from "@/components/nav-favorites"
import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getAllWorkspaces } from "@/services/workspaceService"

// This is sample data.
const data = {
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
      ],
    },
  ],
}

interface Workspace {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [workspaces, setWorkspaces] = React.useState<Workspace[]>([]);

  React.useEffect(() => {
    getAllWorkspaces().then((data) => {
      setWorkspaces(data ?? []);
    });
  }, [])

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
