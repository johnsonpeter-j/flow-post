import { BrandingPanel, LoginForm } from '@/components/signin';

export default function MinimalLogin() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <BrandingPanel />
      <LoginForm />
    </div>
  );
}