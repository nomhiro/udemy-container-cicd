"use client";

import React from 'react';
import TodoForm from '../../../components/TodoForm';
import { useRouter } from 'next/navigation';

const CreateTodoPage = () => {
  const router = useRouter();

  const handleSubmit = async (
    id: string,
    title: string,
    description: string,
    status: 'Not Started' | 'In Progress' | 'Completed'
  ) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

    // 必要なフィールドを生成
    const dueDate = new Date().toISOString(); // 仮に現在日時を設定
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const response = await fetch(`${apiBaseUrl}/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, description, status, dueDate, createdAt, updatedAt }), // 必須フィールドをすべて含める
    });

    if (response.ok) {
      router.push('/todo');
    } else {
      console.error('Failed to create todo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Task</h1>
        <TodoForm onSubmit={handleSubmit} />
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

export default CreateTodoPage;
