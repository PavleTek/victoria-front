import api from './api';
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest,
  ApiResponse,
} from '../types';

export const contactService = {
  async getAllContacts(): Promise<{ contacts: Contact[] }> {
    const response = await api.get<ApiResponse & { contacts: Contact[] }>('/admin/contacts');
    return { contacts: response.data.contacts };
  },

  async getContactById(id: number): Promise<{ contact: Contact }> {
    const response = await api.get<ApiResponse & { contact: Contact }>(`/admin/contacts/${id}`);
    return { contact: response.data.contact };
  },

  async createContact(data: CreateContactRequest): Promise<{ contact: Contact }> {
    const response = await api.post<ApiResponse & { contact: Contact }>('/admin/contacts', data);
    return { contact: response.data.contact };
  },

  async updateContact(id: number, data: UpdateContactRequest): Promise<{ contact: Contact }> {
    const response = await api.put<ApiResponse & { contact: Contact }>(`/admin/contacts/${id}`, data);
    return { contact: response.data.contact };
  },

  async deleteContact(id: number): Promise<void> {
    await api.delete<ApiResponse>(`/admin/contacts/${id}`);
  },
};

