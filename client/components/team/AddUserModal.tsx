'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Department } from '@/data/mockData';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (fullName: string, email: string, departmentId: string) => void;
  departments: Department[];
  isLoading?: boolean;
  apiError?: string | null;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onAdd,
  departments,
  isLoading = false,
  apiError = null,
}: AddUserModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Reset form when modal closes after successful creation
  useEffect(() => {
    if (!isOpen && !isLoading) {
      setFullName('');
      setEmail('');
      setDepartmentId('');
      setValidationErrors({});
    }
  }, [isOpen, isLoading]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAdd = () => {
    const errors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!departmentId) {
      errors.department = 'Department is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    onAdd(fullName.trim(), email.trim(), departmentId);
    // Don't reset form or close modal here - let parent handle it after successful API call
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setDepartmentId('');
    setValidationErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 px-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h3 className="text-[1.1rem] font-semibold text-[#111827]">Add User</h3>
          <button
            className="bg-transparent border-none text-[#9CA3AF] cursor-pointer p-1 hover:text-[#6B7280] transition-colors"
            onClick={handleCancel}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}
          {Object.keys(validationErrors).length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {Object.values(validationErrors)[0]}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (validationErrors.fullName) {
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.fullName;
                    return newErrors;
                  });
                }
              }}
              className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                validationErrors.fullName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
              }`}
            />
            {validationErrors.fullName && (
              <p className="text-xs text-red-600 mt-0.5">{validationErrors.fullName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Email ID *
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.email;
                    return newErrors;
                  });
                }
              }}
              className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none placeholder:text-[#9CA3AF] ${
                validationErrors.email
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
              }`}
            />
            {validationErrors.email && (
              <p className="text-xs text-red-600 mt-0.5">{validationErrors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.75rem] font-semibold text-[#374151] uppercase tracking-wide">
              Department *
            </label>
            <select
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                if (validationErrors.department) {
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.department;
                    return newErrors;
                  });
                }
              }}
              className={`py-2.5 px-3 border rounded-lg text-[0.85rem] text-[#111827] focus:outline-none bg-white cursor-pointer ${
                validationErrors.department
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#9CA3AF]'
              }`}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {validationErrors.department && (
              <p className="text-xs text-red-600 mt-0.5">{validationErrors.department}</p>
            )}
          </div>
        </div>
        <div className="p-4 px-6 border-t border-[#E5E7EB] flex justify-end gap-2.5">
          <button
            className="py-2.5 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[0.85rem] text-[#6B7280] cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="py-2.5 px-5 bg-[#111827] border-none rounded-lg text-[0.85rem] text-white cursor-pointer hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAdd}
            disabled={!fullName.trim() || !email.trim() || !departmentId || isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}


