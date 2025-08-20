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

  const rawBookmarklet = useMemo(() => {
    if (!userId) return '';
    const js = `(function(){var id='${userId}';var base='${process.env.NEXT_PUBLIC_BASE_URL || ''}'||location.origin;fetch(base+'/api/profile?id='+encodeURIComponent(id),{credentials:'omit'}).then(function(r){return r.json();}).then(function(d){var m=d||{};function fill(sel,val){try{var els=Array.from(document.querySelectorAll(sel));els.forEach(function(el){if(!el) return;var t=(el.type||'').toLowerCase();if(t==='checkbox'){el.checked=!!val;}else if(t==='radio'){if(el.value==val){el.checked=true;}}else{el.value=val||'';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}});}catch(e){}}var map={name:m.name,fullname:m.name,email:m.email,phone:m.phone,telephone:m.phone,mobile:m.phone,address:m.address,line1:m.address,city:m.city,state:m.state,zip:m.zip||m.postalCode,pincode:m.zip||m.postalCode,parent_name:m.parentName,father:m.fatherName,mother:m.motherName,guardian:m.guardianName,school:m.school,college:m.college,university:m.university,degree:m.degree,branch:m.branch,course:m.course,roll:m.rollNumber,rollnumber:m.rollNumber,registration:m.registrationNumber,regno:m.registrationNumber,year:m.year,semester:m.semester,percentage:m.percentage,cgpa:m.cgpa,dob:m.dob,dateofbirth:m.dob};Object.keys(map).forEach(function(k){var v=map[k];if(v==null) return;fill('input[name=\"'+k+'\"]',v);fill('input[id=\"'+k+'\"]',v);fill('input[placeholder*=\"'+k+'\" i]',v);fill('textarea[name=\"'+k+'\"]',v);fill('select[name=\"'+k+'\"]',v);});}).catch(function(e){console.error(e);});})();`;
    return `javascript:${js}`;
  }, [userId]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your profile and generate your auto-fill link.</p>
        </div>
        <Link href="/profile" className="btn btn-outline">Edit Profile</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-5 md:col-span-2">
          <h2 className="font-semibold mb-2">Your Bookmarklet</h2>
          <p className="text-sm text-gray-600 mb-3">Drag this button to your bookmarks bar or copy the link below.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a className="btn btn-primary" href={bookmarklet} onClick={(e)=>{}}>Auto-Fill</a>
            <button className="btn btn-outline" onClick={() => navigator.clipboard.writeText(bookmarklet)} disabled={!bookmarklet}>Copy Link</button>
            <button className="btn btn-outline" onClick={() => navigator.clipboard.writeText(rawBookmarklet)} disabled={!rawBookmarklet}>Copy Code (Mobile)</button>
          </div>
          <div className="mt-3 p-3 bg-gray-50 border rounded text-xs break-all select-all">{bookmarklet || 'Generating...'}</div>
          <div className="mt-3 p-3 bg-gray-50 border rounded text-xs break-all select-all">{rawBookmarklet || ''}</div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold mb-2">Profile Status</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><span className="text-gray-500">User ID:</span> <span className="font-mono">{userId ?? '...'}</span></li>
            <li className="text-gray-500">Stored locally in your browser</li>
          </ul>
          <Link href="/profile" className="mt-4 btn btn-outline w-full text-center">Update Details</Link>
        </div>

        <div className="card p-5 md:col-span-3">
          <h2 className="font-semibold mb-2">Mobile Setup</h2>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700">
            <div>
              <div className="font-medium mb-1">iOS Safari</div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Tap Share → Add Bookmark. Name it "Auto-Fill".</li>
                <li>Tap the bookmarks icon → Edit, and paste the copied "Copy Code (Mobile)" into the URL field.</li>
                <li>While on any form page, open bookmarks and tap "Auto-Fill".</li>
              </ol>
            </div>
            <div>
              <div className="font-medium mb-1">Android Chrome</div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Bookmark any page (star icon), then edit the bookmark.</li>
                <li>Set the name "Auto-Fill" and paste the "Copy Code (Mobile)" into the URL field.</li>
                <li>Open the bookmark from the bookmarks manager while on a form page.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}