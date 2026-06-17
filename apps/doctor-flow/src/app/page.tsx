'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          DOCTOR FLOW
        </h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Welcome to Doctor Flow
        </p>
        <div className="border-2 border-black p-8 text-center">
          <p className="text-xs text-gray-600">
            Healthcare Marketplace
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}