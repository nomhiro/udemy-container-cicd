"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TodoForm from '../../../../components/TodoForm';
import { Todo } from '../../../../types/todo';

const EditTodoPage = () => {
  const { id } = useParams(); // useParamsでIDを取得
  const router = useRouter();

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      // const apiBaseUrl = process.env.API_BASE_URL;
      const response = await fetch(`/api/todo?id=${id}`); // 正しいURLを構築
      if (response.ok) {
        const data: Todo = await response.json();
        setTodo(data);
      } else {
        console.error('Failed to fetch todo');
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const handleSubmit = async (todoData: Todo) => {
    // const apiBaseUrl = process.env.API_BASE_URL;

    const response = await fetch(`/api/todo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (response.ok) {
      router.push('/todo');
    } else {
      console.error('Failed to update todo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6">Edit TODO</h1>
        {todo && (
          <TodoForm
            todoData={todo}
            onSubmit={handleSubmit}
          />
        )}
        <button
          onClick={() => router.back()}
          className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default EditTodoPage;
