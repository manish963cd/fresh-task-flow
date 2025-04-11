import React, { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoEditor from "@/components/TodoEditor";
import { Todo, createTodo, deleteTodo, fetchTodos } from "@/api/todoApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 10;

  const loadTodos = async (page = 1) => {
    const result = await fetchTodos(page, itemsPerPage);
    if (result) {
      setTodos(result.todos);
      setTotalPages(result.totalPages);
      // If we had a selected todo, try to keep it selected after refresh
      if (selectedTodo?._id) {
        const stillExists = result.todos.find(t => t._id === selectedTodo._id);
        if (!stillExists) {
          setSelectedTodo(null);
        }
      }
    }
  };

  useEffect(() => {
    loadTodos(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsMobileEditorOpen(true);
  };

  const handleCreateTodo = async () => {
    const newTodo = await createTodo({
      title: "New Additions",
      description: "To stay representative of framework & new example apps.",
    });
    
    if (newTodo) {
      // Refresh the todo list
      loadTodos(currentPage);
      // Select the new todo
      setSelectedTodo(newTodo);
      setIsMobileEditorOpen(true);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const success = await deleteTodo(id);
    if (success) {
      setSelectedTodo(null);
      setIsMobileEditorOpen(false);
      loadTodos(currentPage);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setSelectedTodo(updatedTodo);
    
    // Update the todo in the list as well
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handleBack = () => {
    setIsMobileEditorOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className={`${isMobileEditorOpen ? 'hidden' : 'block'} md:block md:flex-shrink-0`}>
          <TodoList
            todos={todos}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onSelectTodo={handleSelectTodo}
            onCreateTodo={handleCreateTodo}
            selectedTodoId={selectedTodo?._id}
          />
        </div>
        
        <div className={`${isMobileEditorOpen ? 'block' : 'hidden'} md:block flex-1`}>
          <TodoEditor
            todo={selectedTodo}
            onBack={handleBack}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
