
import React from "react";
import { Pencil } from "lucide-react";

const TodoLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <Pencil className="h-5 w-5 text-todo" />
      <span className="font-bold text-black">TODO</span>
    </div>
  );
};

export default TodoLogo;
