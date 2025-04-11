
import React, { useState, useEffect, useRef } from "react";
import { Todo, updateTodo } from "@/api/todoApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import TodoLogo from "./TodoLogo";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@tinymce/tinymce-react";

interface TodoEditorProps {
  todo: Todo | null;
  onBack: () => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

const TodoEditor: React.FC<TodoEditorProps> = ({ todo, onBack, onDelete, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
    }
  }, [todo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsEditing(true);
  };

  const handleEditorChange = (content: string) => {
    setDescription(content);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (todo?._id) {
      onDelete(todo._id);
    }
  };

  const handleSave = async () => {
    if (!todo?._id) return;
    
    try {
      const updatedTodo = await updateTodo(todo._id, {
        title,
        description
      });
      
      if (updatedTodo) {
        setIsEditing(false);
        onUpdate(updatedTodo);
        toast({
          title: "Success",
          description: "Todo updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    }
  };

  if (!todo) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p>Select a todo from the list</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <TodoLogo />
        </div>
        <div className="flex space-x-2">
          {isEditing && (
            <Button onClick={handleSave} size="sm" className="bg-todo hover:bg-todo-dark text-white">
              Save
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-xl font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Title"
        />
        
        <div className="mt-4">
          <Editor
            apiKey="no-api-key" // Replace with your TinyMCE API key or leave as is for development
            onInit={(evt, editor) => editorRef.current = editor}
            value={description}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoEditor;
