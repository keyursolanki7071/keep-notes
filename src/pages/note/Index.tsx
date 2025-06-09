import Editor from "@/components/rich-text-editor";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Index = () => {

    const {id} = useParams();
    const {setActiveNote, getNote} = useWorkspaceStore();

    useEffect(() => {
        if(id) {
            getNote(Number(id)).then((data) => {
                setActiveNote({
                    id: data.id,
                    name: data.name,
                    favourite: data.favourite,
                    workspace_id: data.workspace_id
                });
            })
        }
        return () => {
            setActiveNote(null);
        }
    }, [id])

    const [content, setContent] = useState("");
    return <>
    <Editor content={content} setContent={setContent} ></Editor>
    </>
}

export default Index;