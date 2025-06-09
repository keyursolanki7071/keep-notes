import Editor from "@/components/rich-text-editor";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Index = () => {
  const { id } = useParams();
  const { setActiveNote, getNote, updateNoteContent } = useWorkspaceStore();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNote(Number(id)).then((data) => {
        setActiveNote({
          id: data.id,
          name: data.name,
          favourite: data.favourite,
          workspace_id: data.workspace_id,
        });
        setContent(data.content);
        setName(data.name);
        setLoading(false);
      });
    }
    return () => {
      setActiveNote(null);
    };
  }, [id]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateNoteContent(Number(id), content);
    }, 3000);
    return () => {
      clearTimeout(handler);
    };
  }, [content]);

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 p-4">{name}</h1>
          <Editor content={content} setContent={setContent}></Editor>
        </>
      )}
    </>
  );
};

export default Index;
