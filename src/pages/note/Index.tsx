import Editor from "@/components/rich-text-editor";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Index = () => {

    const {id} = useParams();
    const {setActiveNote} = useWorkspaceStore();
    useEffect(() => {
        if(id) {
            setActiveNote(Number(id));
        }

        return () => {
            setActiveNote(null);
        }
    }, [id, setActiveNote])

    const [content, setContent] = useState("");
    return <>
    <Editor content={content} setContent={setContent} ></Editor>
    </>
}

export default Index;