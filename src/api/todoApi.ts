
import { toast } from "sonner";

export interface Todo {
  _id?: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "/api/todos";

export const fetchTodos = async (page = 1, limit = 10): Promise<{ todos: Todo[], totalPages: number }> => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    toast.error("Failed to load todos");
    return { todos: [], totalPages: 0 };
  }
};

export const fetchTodoById = async (id: string): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todo:", error);
    toast.error("Failed to load todo details");
    return null;
  }
};

export const createTodo = async (todoData: Partial<Todo>): Promise<Todo | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    const newTodo = await response.json();
    toast.success("Todo created successfully");
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    toast.error("Failed to create todo");
    return null;
  }
};

export const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    const updatedTodo = await response.json();
    toast.success("Todo updated successfully");
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    toast.error("Failed to update todo");
    return null;
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    toast.success("Todo deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    toast.error("Failed to delete todo");
    return false;
  }
};
