export type EmploymentStatus = 'Probationary' | 'Regular' | 'Resigned' | 'Terminated' | 'Contractual';
export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half Day' | 'Rest Day' | 'Holiday' | 'On Leave';
export type RequestStatus = 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Cancelled' | 'Posted';
export type IncidentStatus = 'Open' | 'Under Review' | 'Resolved' | 'Closed';

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Division {
  id: string;
  name: string;
  deptId: string;
}

export interface Position {
  id: string;
  title: string;
  level: string; // e.g., Entry, Senior, Lead, Manager
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  type: 'Warehouse' | 'Retail' | 'Office';
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  email: string;
  contactNo: string;
  
  // Org Assignment
  branchId: string;
  deptId: string;
  divisionId?: string;
  positionId: string;
  
  // Status & Dates
  status: EmploymentStatus;
  hireDate: string;
  regularizationDate?: string;
  resignationDate?: string;
  
  // Payroll / Gov IDs
  tin?: string;
  sssNo?: string;
  philHealthNo?: string;
  pagibigNo?: string;
  dailyRate: number;
  monthlyRate: number;
  
  // Extras
  emergencyContact?: string;
  avatarUrl?: string;
}

export interface AttendanceLog {
  id: string;
  employeeId: string;
  date: string;
  timeIn: string;
  timeOut?: string;
  source: 'Biometric' | 'Mobile' | 'Manual';
}

export interface AttendanceSummary {
  id: string;
  employeeId: string;
  date: string;
  status: AttendanceStatus;
  minutesLate: number;
  underTime: number;
  overTime: number;
  isHoliday: boolean;
  remarks?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'Vacation' | 'Sick' | 'Emergency' | 'Maternity' | 'Paternity' | 'Leave Without Pay';
  startDate: string;
  endDate: string;
  reason: string;
  status: RequestStatus;
  approvedBy?: string;
  appliedDate: string;
}

export interface OvertimeRequest {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  reason: string;
  status: RequestStatus;
  approvedBy?: string;
}

export interface UndertimeRequest {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  reason: string;
  status: RequestStatus;
  approvedBy?: string;
}

export interface Holiday {
  id: string;
  date: string;
  name: string;
  type: 'Regular' | 'Special Non-Working';
}

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  documentType: 'NBI Clearance' | 'Health Certificate' | 'Government ID' | 'Birth Certificate' | 'Contract';
  status: 'Submitted' | 'Missing' | 'Expired' | 'Verified';
  expiryDate?: string;
  fileUrl?: string;
}

export interface IncidentRecord {
  id: string;
  employeeId: string;
  type: 'Disciplinary' | 'Commendation' | 'Accident' | 'Complaint';
  date: string;
  description: string;
  status: IncidentStatus;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface UserAccessRole {
  id: string;
  employeeId: string;
  role: 'HR Admin' | 'HR Staff' | 'Payroll Staff' | 'Branch Manager' | 'Employee' | 'Admin';
  permissions: string[];
}
