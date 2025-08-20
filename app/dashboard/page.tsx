"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getUserId, ensureUserId } from '../../lib/user';

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    ensureUserId();
    setUserId(getUserId());
  }, []);

  const bookmarklet = useMemo(() => {
    if (!userId) return '';
    const js = `(function(){var id='${userId}';var base='${process.env.NEXT_PUBLIC_BASE_URL || ''}'||location.origin;fetch(base+'/api/profile?id='+encodeURIComponent(id),{credentials:'omit'}).then(function(r){return r.json();}).then(function(d){var m=d||{};function fill(sel,val){try{var els=Array.from(document.querySelectorAll(sel));els.forEach(function(el){if(!el) return;var t=(el.type||'').toLowerCase();if(t==='checkbox'){el.checked=!!val;}else if(t==='radio'){if(el.value==val){el.checked=true;}}else{el.value=val||'';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}});}catch(e){}}var map={name:m.name,fullname:m.name,email:m.email,phone:m.phone,telephone:m.phone,mobile:m.phone,address:m.address,line1:m.address,city:m.city,state:m.state,zip:m.zip||m.postalCode,pincode:m.zip||m.postalCode,parent_name:m.parentName,father:m.fatherName,mother:m.motherName,guardian:m.guardianName,school:m.school,college:m.college,university:m.university,degree:m.degree,branch:m.branch,course:m.course,roll:m.rollNumber,rollnumber:m.rollNumber,registration:m.registrationNumber,regno:m.registrationNumber,year:m.year,semester:m.semester,percentage:m.percentage,cgpa:m.cgpa,dob:m.dob,dateofbirth:m.dob};Object.keys(map).forEach(function(k){var v=map[k];if(v==null) return;fill('input[name="'+k+'"]',v);fill('input[id="'+k+'"]',v);fill('input[placeholder*="'+k+'" i]',v);fill('textarea[name="'+k+'"]',v);fill('select[name="'+k+'"]',v);});}).catch(function(e){console.error(e);});})();`;
    return `javascript:${encodeURIComponent(js)}`;
  }, [userId]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Link href="/profile" className="block p-4 rounded-lg border hover:shadow-sm">
          <h2 className="font-medium">Add/Edit Profile</h2>
          <p className="text-sm text-gray-600">Update your stored details.</p>
        </Link>
        <div className="block p-4 rounded-lg border">
          <h2 className="font-medium">Generate Bookmarklet</h2>
          <p className="text-sm text-gray-600 mb-2">Drag the button to your bookmarks bar, or copy the link.</p>
          <div className="flex items-center gap-2">
            <a className="px-3 py-2 text-sm rounded bg-black text-white disabled:opacity-50" href={bookmarklet} onClick={(e)=>{}}>
              Auto-Fill
            </a>
            <button className="px-3 py-2 text-sm rounded border" onClick={() => navigator.clipboard.writeText(bookmarklet)} disabled={!bookmarklet}>
              Copy Link
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 break-all">{bookmarklet || 'Generating...'}</p>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p><span className="font-medium">Your ID:</span> {userId ?? '...'}</p>
        <p className="mt-2">This ID is stored locally to fetch your data without login.</p>
      </div>
    </main>
  );
}