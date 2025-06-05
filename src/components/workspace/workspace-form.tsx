import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

interface WorkspaceFormProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({isOpen, setIsOpen}) => {
  return (
    <Dialog open={isOpen} >
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="workspaceName" className="sr-only">
              Workspace Name
            </Label>
            <Input
              id="workspaceName"
            />
          </div>
        </div>
        <DialogFooter>
            <DialogClose onClick={() => setIsOpen(false)}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceForm;
