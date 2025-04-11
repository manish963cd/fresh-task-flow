
import React, { useState, useEffect } from "react";
import { Todo, updateTodo } from "@/api/todoApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import TodoLogo from "./TodoLogo";
import { useToast } from "@/hooks/use-toast";

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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setDescription(e.target.innerHTML);
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

  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const selectedContent = document.createTextNode(selection.toString());
      range.deleteContents();
      range.insertNode(selectedContent);
    }
    setIsEditing(true);
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
        <div className="editor-toolbar mt-4">
          <button onClick={() => formatText('bold')}><Bold className="h-4 w-4" /></button>
          <button onClick={() => formatText('italic')}><Italic className="h-4 w-4" /></button>
          <button onClick={() => formatText('underline')}><Underline className="h-4 w-4" /></button>
          <button onClick={() => formatText('insertUnorderedList')}><List className="h-4 w-4" /></button>
          <button onClick={() => formatText('insertOrderedList')}><ListOrdered className="h-4 w-4" /></button>
          <button onClick={() => formatText('justifyLeft')}><AlignLeft className="h-4 w-4" /></button>
          <button onClick={() => formatText('justifyCenter')}><AlignCenter className="h-4 w-4" /></button>
          <button onClick={() => formatText('justifyRight')}><AlignRight className="h-4 w-4" /></button>
        </div>
        <div
          className="todo-content"
          contentEditable
          dangerouslySetInnerHTML={{ __html: description }}
          onInput={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default TodoEditor;
