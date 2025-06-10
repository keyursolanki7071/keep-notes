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
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

interface WorkspaceFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  workspace: number | null;
}

const NewNoteForm: React.FC<WorkspaceFormProps> = ({ isOpen, setIsOpen, workspace }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const { createNote } = useWorkspaceStore();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setNameError(false);
    if (!name) {
      setNameError(true);
      return false;
    }
    if(workspace) {
      setSubmitting(true);
      const note = await createNote(workspace, name);
      setIsOpen(false);
      setName("");
      setSubmitting(false);
      return navigate(`note/${note.id}`);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="workspaceName" className="sr-only">
              Name
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
          <DialogClose onClick={() => setIsOpen(false)} disabled={submitting}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {!submitting ? "Save" : (
              <>
              <Loader2Icon className="animate-spin"></Loader2Icon>
              Saving
              </>
            ) }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewNoteForm;
