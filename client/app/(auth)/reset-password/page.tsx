import { Suspense } from 'react';
import { BrandingPanel, ResetPasswordForm } from '@/components/signin';

function ResetPasswordFormWrapper() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <BrandingPanel />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <ResetPasswordFormWrapper />
      </Suspense>
    </div>
  );
}

