import type { User, Currency } from './index';

export interface Address {
  addressLine1: string;  // Mandatory
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Contact {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  chileanRutNumber?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  color?: string;
  notes?: string | null;
  taxID?: string | null;
  roleInCompany?: string | null;
  address?: Address | null;
  country?: string | null;
  language?: string | null;
  createdAt: string;
  updatedAt: string;
  currencyId?: number | null;
  currency?: Currency | null;
  associatedCompanyId?: number | null;
  associatedCompany?: Company | null;
  defaultBankAccountId?: number | null;
  defaultBankAccount?: BankAccount | null;
  createdById?: number | null;
  createdBy?: User | null;
  bankAccounts?: BankAccount[];
}

export interface CreateContactRequest {
  firstName?: string;
  lastName?: string;
  chileanRutNumber?: string;
  phoneNumber?: string;
  email?: string;
  color?: string;
  notes?: string;
  taxID?: string;
  roleInCompany?: string;
  address?: Address | null;
  countryId?: number;
  languageId?: number;
  currencyId?: number;
  associatedCompanyId?: number;
  defaultBankAccountId?: number;
}

export interface UpdateContactRequest {
  firstName?: string;
  lastName?: string;
  chileanRutNumber?: string;
  phoneNumber?: string;
  email?: string;
  color?: string;
  notes?: string;
  taxID?: string;
  roleInCompany?: string;
  address?: Address | null;
  countryId?: number;
  languageId?: number;
  currencyId?: number;
  associatedCompanyId?: number;
  defaultBankAccountId?: number;
}

export interface Company {
  id: number;
  displayName?: string | null;
  legalName?: string | null;
  taxId?: string | null;
  website?: string | null;
  businessType?: string | null;
  color?: string;
  address?: Address | null;
  country?: string | null;
  language?: string | null;
  isVictoriaLineCompany: boolean;
  createdAt: string;
  updatedAt: string;
  currencyId?: number | null;
  currency?: Currency | null;
  defaultContactId?: number | null;
  defaultContact?: Contact | null;
  createdById?: number | null;
  createdBy?: User | null;
  associatedContacts?: Contact[];
  bankAccounts?: BankAccount[];
}

export interface CreateCompanyRequest {
  displayName?: string;
  legalName?: string;
  taxId?: string;
  website?: string;
  businessType?: string;
  color?: string;
  address?: Address | null;
  country?: string;
  language?: string;
  currencyId?: number;
  defaultContactId?: number;
  isVictoriaLineCompany?: boolean;
}

export interface UpdateCompanyRequest {
  displayName?: string;
  legalName?: string;
  taxId?: string;
  website?: string;
  businessType?: string;
  color?: string;
  address?: Address | null;
  country?: string;
  language?: string;
  currencyId?: number;
  defaultContactId?: number;
  isVictoriaLineCompany?: boolean;
}

export interface BankAccount {
  id: number;
  bankName?: string | null;
  accountHolder?: string | null;
  accountNumber?: string | null;
  accountType?: string | null;
  swiftCode?: string | null;
  ibanCode?: string | null;
  routingNumber?: string | null;
  bankCode?: string | null;
  branchName?: string | null;
  email?: string | null;
  notes?: string | null;
  country?: string | null;
  createdAt: string;
  updatedAt: string;
  currencyId?: number | null;
  currency?: Currency | null;
  ownerContactId?: number | null;
  ownerContact?: Contact | null;
  ownerCompanyId?: number | null;
  ownerCompany?: Company | null;
}

export interface CreateBankAccountRequest {
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  accountType?: string;
  swiftCode?: string;
  ibanCode?: string;
  routingNumber?: string;
  bankCode?: string;
  branchName?: string;
  email?: string;
  notes?: string;
  currencyId?: number;
  country?: string;
  ownerContactId?: number;
  ownerCompanyId?: number;
}

export interface UpdateBankAccountRequest {
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  accountType?: string;
  swiftCode?: string;
  ibanCode?: string;
  routingNumber?: string;
  bankCode?: string;
  branchName?: string;
  email?: string;
  notes?: string;
  currencyId?: number;
  country?: string;
  ownerContactId?: number;
  ownerCompanyId?: number;
}

export interface EmailTemplate {
  id: number;
  description?: string | null;
  subject?: string | null;
  content?: string | null;
  destinationEmail?: string[] | null; // Merged emails (hard-typed + contact emails)
  ccEmail?: string[] | null; // Merged emails (hard-typed + contact emails)
  bccEmail?: string[] | null; // Merged emails (hard-typed + contact emails)
  fromEmail?: string | null;
  private: boolean;
  createdAt: string;
  updatedAt: string;
  createdById?: number | null;
  createdBy?: User | null;
  toContactIds?: number[]; // Contact IDs for "to"
  ccContactIds?: number[]; // Contact IDs for "cc"
  bccContactIds?: number[]; // Contact IDs for "bcc"
}

export interface CreateEmailTemplateRequest {
  description?: string;
  subject?: string;
  content?: string;
  destinationEmail?: string[]; // Only hard-typed emails
  ccEmail?: string[]; // Only hard-typed emails
  bccEmail?: string[]; // Only hard-typed emails
  fromEmail?: string;
  private?: boolean;
  toContactIds?: number[]; // Contact IDs for "to"
  ccContactIds?: number[]; // Contact IDs for "cc"
  bccContactIds?: number[]; // Contact IDs for "bcc"
}

export interface UpdateEmailTemplateRequest {
  description?: string;
  subject?: string;
  content?: string;
  destinationEmail?: string[]; // Only hard-typed emails
  ccEmail?: string[]; // Only hard-typed emails
  bccEmail?: string[]; // Only hard-typed emails
  fromEmail?: string;
  private?: boolean;
  toContactIds?: number[]; // Contact IDs for "to"
  ccContactIds?: number[]; // Contact IDs for "cc"
  bccContactIds?: number[]; // Contact IDs for "bcc"
}

