'use client';

import { useState, useMemo, useEffect } from 'react';
import ClientsHeader from '@/components/clients/ClientsHeader';
import ClientsGrid from '@/components/clients/ClientsGrid';
import AddClientModal from '@/components/clients/AddClientModal';
import type { Client, NewClient } from '@/components/clients/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createClient, getClients } from '@/store/client/clientThunk';
import type { CreateClientData } from '@/store/client/clientTypes';
import type { Client as ApiClient } from '@/store/client/clientTypes';
import { mockBriefs, mockContentBank } from '@/data/mockData';

export default function ClientsPage() {
  const dispatch = useAppDispatch();
  const { clients: apiClients, createClient: createClientState } = useAppSelector((state) => state.client);
  
  // Use mock data as reference for briefs and contentBank (local state)
  const briefs = mockBriefs;
  const contentBank = mockContentBank;
  
  // Fetch clients from API on mount
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);
  
  // Map API clients to component Client type
  const clients: Client[] = useMemo(() => {
    return apiClients.map((apiClient: ApiClient) => ({
      id: apiClient._id,
      name: apiClient.name,
      industry: apiClient.businessType,
      color: apiClient.brandColor || '#6B7280',
      logo: apiClient.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase(),
      description: apiClient.description || '',
      website: apiClient.website || '',
      contact: apiClient.mail || '',
    }));
  }, [apiClients]);

  const getClientStats = (clientId: string) => {
    // Calculate stats from your data source
    const content = contentBank.filter((c) => c.clientId === clientId);
    const clientBriefs = briefs.filter((b) => b.clientId === clientId);
    const posted = content.filter((c) => c.stage === 'posted').length;
    return {
      content: content.length,
      briefs: clientBriefs.length,
      posted,
    };
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState<NewClient>({
    name: '',
    industry: '',
    description: '',
    website: '',
    contact: '',
    color: '#6B7280',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!newClient.name.trim()) {
      errors.name = 'Client name is required';
    }

    if (!newClient.industry.trim()) {
      errors.industry = 'Industry is required';
    }

    if (!newClient.contact.trim()) {
      errors.contact = 'Contact email is required';
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newClient.contact.trim())) {
        errors.contact = 'Please enter a valid email address';
      }
    }

    if (newClient.website && newClient.website.trim()) {
      // Basic URL validation (optional field)
      try {
        // Add protocol if missing for validation
        const urlToValidate = newClient.website.trim().startsWith('http') 
          ? newClient.website.trim() 
          : `https://${newClient.website.trim()}`;
        new URL(urlToValidate);
      } catch {
        errors.website = 'Please enter a valid website URL';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddClient = async () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Map form data to API format
      const clientData: CreateClientData = {
        name: newClient.name.trim(),
        businessType: newClient.industry.trim(),
        description: newClient.description.trim() || undefined,
        website: newClient.website.trim() || undefined,
        mail: newClient.contact.trim(),
        brandColor: newClient.color || undefined,
      };

      // Call API to create client
      const result = await dispatch(createClient(clientData)).unwrap();

      // Reset form and close modal on success
      setNewClient({
        name: '',
        industry: '',
        description: '',
        website: '',
        contact: '',
        color: '#6B7280',
      });
      setIsAddingClient(false);
      setValidationErrors({});
    } catch (error) {
      // Error is already handled in Redux state, but we can show it
      console.error('Failed to create client:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ClientsHeader
        clientCount={clients.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClient={() => setIsAddingClient(true)}
      />
      <ClientsGrid
        clients={filteredClients}
        getClientStats={getClientStats}
        onAddClient={() => setIsAddingClient(true)}
      />
      <AddClientModal
        isOpen={isAddingClient}
        onClose={() => {
          setIsAddingClient(false);
          setValidationErrors({});
        }}
        newClient={newClient}
        onClientChange={setNewClient}
        onSave={handleAddClient}
        isLoading={createClientState.isLoading}
        validationErrors={validationErrors}
        apiError={createClientState.error}
      />
    </div>
  ); 
}
