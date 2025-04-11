
import React from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // No need to render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Get array of page numbers to show
  const getPageNumbers = () => {
    // Show at most 5 page numbers total
    const pages = [];
    
    // Always include the first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if there's a gap after page 1
    if (rangeStart > 2) {
      pages.push("ellipsis1");
    }
    
    // Add pages from range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if there's a gap before last page
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis2");
    }
    
    // Always include the last page if totalPages > 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      
      {getPageNumbers().map((page, index) => (
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-8 w-8",
              page === currentPage && "bg-todo hover:bg-todo-dark"
            )}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        ) : (
          <span key={page} className="px-2">
            …
          </span>
        )
      ))}
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
}
