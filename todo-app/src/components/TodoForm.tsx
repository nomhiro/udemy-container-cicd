import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useRouter } from 'next/navigation';

interface TodoFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialDueDate?: string; // 期日の初期値を追加
  onSubmit: (
    id: string,
    title: string,
    description: string,
    status: Todo['status'],
    dueDate: string,
    createdAt: string,
    updatedAt: string // createdAtとupdatedAtを追加
  ) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialTitle = '', initialDescription = '', initialDueDate = '', onSubmit }) => {
  const router = useRouter(); // ルーターを使用
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState<Todo['status']>('Not Started');
  const [dueDate, setDueDate] = useState(initialDueDate); // 期日を管理
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      setError('All fields are required.');
      return;
    }
    setError('');
    const id = crypto.randomUUID(); // 新規作成時のID生成
    const createdAt = new Date().toISOString(); // 作成日時を現在の日時に設定
    const updatedAt = createdAt; // 更新日時を作成日時と同じに設定
    onSubmit(id, title, description, status, dueDate, createdAt, updatedAt); // 必須フィールドをすべて渡す
    router.push('/todo'); // フォーム送信後にリスト画面に戻る
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Todo['status'])}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
      <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;