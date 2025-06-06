import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import React, { useState } from "react";

interface WorkspaceFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const { createWorkspace } = useWorkspaceStore();

  const handleSubmit = async () => {
    setNameError(false);
    if (!name) {
      setNameError(true);
      return false;
    }
    await createWorkspace(name);
    setIsOpen(false);
    setName("");
  };

  return (
    <Dialog open={isOpen}>
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
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                setName((e.target as HTMLInputElement).value)
              }
              value={name}
            />
            {nameError ? (
              <div className="text-red-500">Please enter name</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose onClick={() => setIsOpen(false)}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceForm;
