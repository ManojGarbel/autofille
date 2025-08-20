export default function HowToPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">How to use Form Auto-Filler</h1>
        <p className="text-sm text-gray-600">Set up once, then auto-fill forms across the web.</p>
      </div>

      <ol className="space-y-4 list-decimal pl-5">
        <li className="card p-4">
          <div className="font-semibold mb-1">Visit the site for the first time</div>
          <div className="text-sm text-gray-600">We generate a unique user ID and store it in your browser’s localStorage. No login is required.</div>
        </li>
        <li className="card p-4">
          <div className="font-semibold mb-1">Create your profile</div>
          <div className="text-sm text-gray-600">Go to the Profile page and fill in personal, contact, and academic details. Click Save to store them.</div>
        </li>
        <li className="card p-4">
          <div className="font-semibold mb-1">Generate your bookmarklet</div>
          <div className="text-sm text-gray-600">Open the Dashboard and drag the “Auto-Fill” button to your bookmarks bar, or click “Copy Link” and create a new bookmark manually.</div>
        </li>
        <li className="card p-4">
          <div className="font-semibold mb-1">Auto-fill any form</div>
          <div className="text-sm text-gray-600">On any website’s form page, click your “Auto-Fill” bookmark. Common fields like name, email, phone, address, and education-related inputs will be filled if they are detected.</div>
        </li>
        <li className="card p-4">
          <div className="font-semibold mb-1">Update anytime</div>
          <div className="text-sm text-gray-600">Return to the Profile page to update your details. The bookmarklet will use the latest saved data automatically.</div>
        </li>
      </ol>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <div className="font-semibold mb-1">Where is my data stored?</div>
          <div className="text-sm text-gray-600">Your user ID is kept in your browser’s localStorage. Your profile data is stored in Redis under that ID and fetched via the app’s API when you click the bookmarklet.</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-1">Troubleshooting</div>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Ensure you saved your profile before generating the bookmarklet.</li>
            <li>Some sites use unusual field names; the bookmarklet fills common ones. You can edit fields that weren’t auto-filled.</li>
            <li>If you cleared browser storage, your user ID may change. Revisit the Dashboard to generate a new bookmarklet.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

