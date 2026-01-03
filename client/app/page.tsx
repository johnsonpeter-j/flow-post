'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        if (typeof window === 'undefined') {
          return;
        }

        const token = localStorage.getItem('token');

        // If no token, redirect to signin
        if (!token) {
          router.push('/signin');
          return;
        }

        // Validate token by calling the verify endpoint
        try {
          const response = await axiosInstance.get('/auth/verify');
          
          if (response.data.success) {
            // Token is valid, redirect to clients page
            router.push('/clients');
          } else {
            // Token validation failed, clear token and redirect to signin
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/signin');
          }
        } catch (error: any) {
          // Token is invalid or expired
          // Clear token and redirect to signin
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/signin');
        }
      } catch (error) {
        // Error checking auth, redirect to signin
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/signin');
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#111827] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // This should not be reached as we redirect in useEffect
  return null;
}
