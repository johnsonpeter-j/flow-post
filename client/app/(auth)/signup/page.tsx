'use client';

import { Suspense } from 'react';
import { BrandingPanel, SignupForm } from '@/components/signin';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <BrandingPanel />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}


