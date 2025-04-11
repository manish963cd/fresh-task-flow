
import React, { useState } from "react";
import { Todo } from "@/api/todoApi";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TodoLogo from "./TodoLogo";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Pagination } from "./ui/pagination";
import { useToast } from "@/hooks/use-toast";

interface TodoListProps {
  todos: Todo[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectTodo: (todo: Todo) => void;
  onCreateTodo: () => void;
  selectedTodoId?: string;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  totalPages,
  currentPage,
  onPageChange,
  onSelectTodo,
  onCreateTodo,
  selectedTodoId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  return (
    <div className="w-full md:w-[350px] border-r flex flex-col h-screen">
      <div className="p-4 border-b flex items-center">
        <TodoLogo />
      </div>
      <div className="flex items-center p-2 space-x-2 border-b">
        <Button
          onClick={onCreateTodo}
          className="bg-black hover:bg-gray-800 text-white rounded py-1 px-2 text-xs flex items-center gap-1"
          size="sm"
        >
          <TodoLogo />
        </Button>
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-2 pr-8 py-1 w-full text-sm"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredTodos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No todos found</div>
        ) : (
          <div className="divide-y">
            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={cn(
                  "p-4 cursor-pointer hover:bg-gray-50",
                  selectedTodoId === todo._id && "bg-gray-50"
                )}
                onClick={() => onSelectTodo(todo)}
              >
                <h3 className="font-bold mb-1">{todo.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {todo.description.replace(/<[^>]*>?/gm, '')}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(todo.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="border-t p-2 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
