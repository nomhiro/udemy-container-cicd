"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import TodoList from '../../components/TodoList';
import CalendarView from '../../components/CalendarView'; // 新しいカレンダーコンポーネントをインポート
import { Todo } from '../../types/todo';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Loading from '../loading'; // Loadingコンポーネントをインポート

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiBaseUrl}/api/todo`);
      const data: Todo[] = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleEdit = (todo: Todo) => {
    router.push(`/todo/edit/${todo.id}?title=${encodeURIComponent(todo.title)}&description=${encodeURIComponent(todo.description)}&status=${todo.status}&dueDate=${encodeURIComponent(todo.dueDate)}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

      const response = await fetch(`${apiBaseUrl}/api/todo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error('Failed to delete todo');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex">
      {/* 左側のTODOリスト */}
      <div className="w-1/2 pr-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">TODO List</h1>
          <Link href="/todo/create">
            <button
              className="p-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-800 transition"
              aria-label="Create New Task"
            >
              <FaPlus size={20} />
            </button>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
        </Suspense>
      </div>
      {/* 右側のカレンダー */}
      <div className="w-1/2 pl-4">
        <CalendarView todos={todos} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default TodoPage;