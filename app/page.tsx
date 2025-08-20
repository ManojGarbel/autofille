"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { ensureUserId } from '../lib/user';

export default function HomePage() {
  useEffect(() => {
    ensureUserId();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Form Auto-Filler</h1>
        <p className="text-gray-600 mb-8">Store your details once. Generate a bookmarklet to auto-fill forms anywhere.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/dashboard" className="block p-6 rounded-lg border hover:shadow-sm">
            <h2 className="font-semibold text-lg">Dashboard</h2>
            <p className="text-sm text-gray-600">Manage your profile and generate your bookmarklet.</p>
          </Link>
          <Link href="/profile" className="block p-6 rounded-lg border hover:shadow-sm">
            <h2 className="font-semibold text-lg">Add/Edit Profile</h2>
            <p className="text-sm text-gray-600">Enter or update your personal and academic details.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
