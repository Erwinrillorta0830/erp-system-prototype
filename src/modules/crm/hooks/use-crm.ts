"use client";

import { useCRM } from "../context/crm-context";

export const useCustomers = () => {
  const { customers, addCustomer, updateCustomer } = useCRM();
  return { customers, addCustomer, updateCustomer };
};

export const useLeads = () => {
  const { leads, addLead, updateLeadStatus } = useCRM();
  return { leads, addLead, updateLeadStatus };
};

export const useActivities = () => {
  const { activities, addActivity } = useCRM();
  return { activities, addActivity };
};

export const useOpportunities = () => {
  const { opportunities } = useCRM();
  return { opportunities };
};

export const useQuotations = () => {
  const { quotations } = useCRM();
  return { quotations };
};

export const useComplaints = () => {
  const { complaints } = useCRM();
  return { complaints };
};

export const useContactPersons = () => {
  const { contacts } = useCRM();
  return { contacts };
};
