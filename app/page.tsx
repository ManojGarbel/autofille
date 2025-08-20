"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { ensureUserId } from '../lib/user';

export default function HomePage() {
  useEffect(() => {
    ensureUserId();
  }, []);

  return (
    <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-fuchsia-500 text-white">⚡</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Auto-fill forms in one click</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Save your personal and academic details once, then use a bookmarklet to fill forms on any website automatically.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <Link href="/profile" className="btn btn-outline">Create / Edit Profile</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-10">
          <div className="card p-4">
            <div className="text-sm font-semibold mb-1">Save Once</div>
            <div className="text-xs text-gray-600">Securely store your details in your Redis database.</div>
          </div>
          <div className="card p-4">
            <div className="text-sm font-semibold mb-1">Generate Bookmarklet</div>
            <div className="text-xs text-gray-600">One link to auto-fill forms across sites.</div>
          </div>
          <div className="card p-4">
            <div className="text-sm font-semibold mb-1">Update Anytime</div>
            <div className="text-xs text-gray-600">Edit your details as life changes.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
