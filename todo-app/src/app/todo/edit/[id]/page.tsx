"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TodoForm from '../../../../components/TodoForm';
import { Todo } from '../../../../types/todo';

const EditTodoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get('title') || '';
  const description = searchParams.get('description') || '';
  const createdAt = searchParams.get('createdAt') || ''; // 作成日時を取得
  const dueDate = searchParams.get('dueDate') || ''; // 期日を取得

  const handleSubmit = async (id: string, title: string, description: string, status: Todo['status'], dueDate: string) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

    const updatedTodo = { id, title, description, status, dueDate, createdAt }; // createdAtを保持

    const response = await fetch(`${apiBaseUrl}/api/todo`, {
      method: 'PUT', // 修正: PUTリクエストを送信
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      router.push('/todo'); // 編集後にリスト画面に戻る
    } else {
      console.error('Failed to update todo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6">Edit TODO</h1>
        <TodoForm
          initialTitle={title}
          initialDescription={description}
          initialDueDate={dueDate} // 期日を渡す
          onSubmit={handleSubmit}
        />
        <button
          onClick={() => router.back()} // 戻るボタンの動作
          className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default EditTodoPage;
