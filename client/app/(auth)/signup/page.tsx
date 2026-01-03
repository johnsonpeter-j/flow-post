'use client';

import { BrandingPanel, SignupForm } from '@/components/signin';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <BrandingPanel />
      <SignupForm />
    </div>
  );
}


