"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Customer, ContactPerson, Lead, Opportunity, 
  Quotation, ActivityLog, ComplaintRecord 
} from "../types";
import { 
  MOCK_CUSTOMERS, MOCK_CONTACTS, MOCK_LEADS, 
  MOCK_OPPORTUNITIES, MOCK_QUOTES, MOCK_ACTIVITIES, 
  MOCK_COMPLAINTS 
} from "../mock/data";

interface CRMContextType {
  customers: Customer[];
  contacts: ContactPerson[];
  leads: Lead[];
  opportunities: Opportunity[];
  quotations: Quotation[];
  activities: ActivityLog[];
  complaints: ComplaintRecord[];
  
  // Actions
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
  addActivity: (activity: ActivityLog) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);

  // Initialize with mock data or localStorage
  useEffect(() => {
    const stored = localStorage.getItem("crm_state");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCustomers(parsed.customers);
      setContacts(parsed.contacts);
      setLeads(parsed.leads);
      setOpportunities(parsed.opportunities);
      setQuotations(parsed.quotations);
      setActivities(parsed.activities);
      setComplaints(parsed.complaints);
    } else {
      setCustomers(MOCK_CUSTOMERS);
      setContacts(MOCK_CONTACTS);
      setLeads(MOCK_LEADS);
      setOpportunities(MOCK_OPPORTUNITIES);
      setQuotations(MOCK_QUOTES);
      setActivities(MOCK_ACTIVITIES);
      setComplaints(MOCK_COMPLAINTS);
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem("crm_state", JSON.stringify({
        customers, contacts, leads, opportunities, quotations, activities, complaints
      }));
    }
  }, [customers, contacts, leads, opportunities, quotations, activities, complaints]);

  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const updateCustomer = (customer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c));
  };
  const addLead = (lead: Lead) => setLeads(prev => [...prev, lead]);
  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };
  const addActivity = (activity: ActivityLog) => setActivities(prev => [...prev, activity]);

  return (
    <CRMContext.Provider value={{ 
      customers, contacts, leads, opportunities, 
      quotations, activities, complaints,
      addCustomer, updateCustomer, addLead, updateLeadStatus, addActivity 
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
};
