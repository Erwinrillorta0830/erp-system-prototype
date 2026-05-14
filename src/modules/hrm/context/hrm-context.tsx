"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Employee, Branch, Department, Position, AttendanceLog, 
  LeaveRequest, OvertimeRequest, 
  Holiday, IncidentRecord, RequestStatus
} from "../types/hrm.types";
import { 
  ALL_MOCK_EMPLOYEES, MOCK_BRANCHES, MOCK_DEPARTMENTS, MOCK_POSITIONS,
  MOCK_ATTENDANCE_LOGS, MOCK_LEAVE_REQUESTS, MOCK_OVERTIME, 
  MOCK_INCIDENTS, MOCK_HOLIDAYS 
} from "../mock/data";

interface HRMContextType {
  employees: Employee[];
  branches: Branch[];
  departments: Department[];
  positions: Position[];
  attendanceLogs: AttendanceLog[];
  leaveRequests: LeaveRequest[];
  overtimeRequests: OvertimeRequest[];
  incidents: IncidentRecord[];
  holidays: Holiday[];
  
  // Actions
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  approveLeave: (requestId: string, approvedBy: string) => void;
  rejectLeave: (requestId: string) => void;
  addLeave: (leave: LeaveRequest) => void;
  logAttendance: (log: Omit<AttendanceLog, 'id'>) => void;
  addOvertime: (ot: OvertimeRequest) => void;
  updateRequestStatus: (type: 'leave' | 'overtime', id: string, status: RequestStatus) => void;
}

const HRMContext = createContext<HRMContextType | undefined>(undefined);

export const HRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(ALL_MOCK_EMPLOYEES);
  const [branches] = useState<Branch[]>(MOCK_BRANCHES);
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [positions] = useState<Position[]>(MOCK_POSITIONS);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(MOCK_ATTENDANCE_LOGS);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>(MOCK_OVERTIME);
  const [incidents] = useState<IncidentRecord[]>(MOCK_INCIDENTS);
  const [holidays] = useState<Holiday[]>(MOCK_HOLIDAYS);

  // Persistence
  useEffect(() => {
    const savedEmployees = localStorage.getItem("hrm_employees");
    const savedLogs = localStorage.getItem("hrm_logs");
    const savedLeaves = localStorage.getItem("hrm_leaves");
    const savedOT = localStorage.getItem("hrm_ot");
    
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    if (savedLogs) setAttendanceLogs(JSON.parse(savedLogs));
    if (savedLeaves) setLeaveRequests(JSON.parse(savedLeaves));
    if (savedOT) setOvertimeRequests(JSON.parse(savedOT));
  }, []);

  useEffect(() => {
    localStorage.setItem("hrm_employees", JSON.stringify(employees));
    localStorage.setItem("hrm_logs", JSON.stringify(attendanceLogs));
    localStorage.setItem("hrm_leaves", JSON.stringify(leaveRequests));
    localStorage.setItem("hrm_ot", JSON.stringify(overtimeRequests));
  }, [employees, attendanceLogs, leaveRequests, overtimeRequests]);

  const addEmployee = (employee: Employee) => {
    setEmployees(prev => [employee, ...prev]);
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees(prev => prev.map(e => e.id === employee.id ? employee : e));
  };

  const approveLeave = (requestId: string, approvedBy: string) => {
    setLeaveRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'Approved', approvedBy } : r
    ));
  };

  const rejectLeave = (requestId: string) => {
    setLeaveRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'Rejected' } : r
    ));
  };

  const addLeave = (leave: LeaveRequest) => {
    setLeaveRequests(prev => [leave, ...prev]);
  };

  const logAttendance = (log: Omit<AttendanceLog, 'id'>) => {
    const newLog = { ...log, id: `log-${Date.now()}` };
    setAttendanceLogs(prev => [newLog, ...prev]);
  };

  const addOvertime = (ot: OvertimeRequest) => {
    setOvertimeRequests(prev => [ot, ...prev]);
  };

  const updateRequestStatus = (type: 'leave' | 'overtime', id: string, status: RequestStatus) => {
    if (type === 'leave') {
      setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } else {
      setOvertimeRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    }
  };

  return (
    <HRMContext.Provider value={{
      employees,
      branches,
      departments,
      positions,
      attendanceLogs,
      leaveRequests,
      overtimeRequests,
      incidents,
      holidays,
      addEmployee,
      updateEmployee,
      approveLeave,
      rejectLeave,
      logAttendance,
      addLeave,
      addOvertime,
      updateRequestStatus
    }}>
      {children}
    </HRMContext.Provider>
  );
};

export const useHRM = () => {
  const context = useContext(HRMContext);
  if (context === undefined) {
    throw new Error("useHRM must be used within an HRMProvider");
  }
  return context;
};
