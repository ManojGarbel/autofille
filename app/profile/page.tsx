"use client";

import { useEffect, useState } from 'react';
import { getUserId, ensureUserId } from '../../lib/user';

type Profile = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dob?: string;
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  school?: string;
  college?: string;
  university?: string;
  degree?: string;
  branch?: string;
  course?: string;
  rollNumber?: string;
  registrationNumber?: string;
  year?: string;
  semester?: string;
  percentage?: string;
  cgpa?: string;
};

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    ensureUserId();
    const id = getUserId();
    setUserId(id);
    if (id) {
      fetch(`/api/profile?id=${encodeURIComponent(id)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => setProfile(data || {}))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch(`/api/profile?id=${encodeURIComponent(userId)}` ,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  function input(name: keyof Profile, label: string, type = 'text', placeholder?: string) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={(profile[name] as string) || ''}
          onChange={(e) => setProfile(p => ({ ...p, [name]: e.target.value }))}
          className="w-full rounded border px-3 py-2"
        />
      </div>
    );
  }

  if (loading) {
    return <main className="max-w-4xl mx-auto p-6">Loading...</main>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-sm text-gray-600">Fill in your personal, contact, and academic information.</p>
      </div>
      <form onSubmit={onSubmit} className="grid gap-6">
        <section>
          <h2 className="font-semibold mb-3">Personal</h2>
          <div className="card p-4 grid gap-4 sm:grid-cols-2">
            {input('name', 'Full Name')}
            {input('dob', 'Date of Birth', 'date')}
            {input('email', 'Email', 'email')}
            {input('phone', 'Phone', 'tel')}
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Address</h2>
          <div className="card p-4 grid gap-4 sm:grid-cols-2">
            {input('address', 'Address Line')}
            {input('city', 'City')}
            {input('state', 'State')}
            {input('postalCode', 'Postal Code')}
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Parents / Guardian</h2>
          <div className="card p-4 grid gap-4 sm:grid-cols-2">
            {input('fatherName', 'Father Name')}
            {input('motherName', 'Mother Name')}
            {input('guardianName', 'Guardian Name')}
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Education</h2>
          <div className="card p-4 grid gap-4 sm:grid-cols-2">
            {input('school', 'School')}
            {input('college', 'College')}
            {input('university', 'University')}
            {input('degree', 'Degree')}
            {input('branch', 'Branch')}
            {input('course', 'Course')}
            {input('rollNumber', 'Roll Number')}
            {input('registrationNumber', 'Registration Number')}
            {input('year', 'Year')}
            {input('semester', 'Semester')}
            {input('percentage', 'Percentage')}
            {input('cgpa', 'CGPA')}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button disabled={saving} className="btn btn-primary disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          {saved && <span className="text-green-600 text-sm">Saved!</span>}
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </form>
    </main>
  );
}
