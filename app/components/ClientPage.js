// app/ClientPage.js
"use client"
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useUser } from '../UserContext';
import ToDoList from './TodoList';
import Link from 'next/link';

function ClientPage() {
  const { user, loading, logout } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center pt-8">
        <div className="container py-8 w-full flex justify-center items-center">
          <div className="grid place-items-center max-w-md w-full">
            <LoginForm />
            <p className="text-center mt-4">
              Don't have an account yet?{' '}
              <Link href="/signup">
                <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
                  Register here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-8">
      <h1 className="text-5xl font-semibold mb-4">
        Hello, {user ? user.email : 'Next.js'}!
      </h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        onClick={logout}
      >
        Logout
      </button>
      <div className="container mx-auto px-4 py-2 md:px-8 w-full">
      <div className="grid place-items-center max-w-lg w-full mx-auto px-2 md:px-0">
          {user && <ToDoList />}
        </div>
      </div>
    </div>
  );
}

export default ClientPage;