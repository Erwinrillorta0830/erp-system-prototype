import { 
  Employee, Branch, Department, Position, AttendanceLog, 
  AttendanceSummary, LeaveRequest, OvertimeRequest, 
  Holiday, EmployeeDocument, IncidentRecord 
} from '../types/hrm.types';

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Manila HQ', location: 'Binondo, Manila', type: 'Office' },
  { id: 'b2', name: 'Sta. Rosa Warehouse', location: 'Laguna', type: 'Warehouse' },
  { id: 'b3', name: 'Cebu Branch', location: 'Mandaue City', type: 'Retail' },
  { id: 'b4', name: 'Bangkok Office', location: 'Bangkok, Thailand', type: 'Office' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Executive', code: 'EXE' },
  { id: 'd2', name: 'Logistics & Warehouse', code: 'LOG' },
  { id: 'd3', name: 'Sales & Marketing', code: 'SAL' },
  { id: 'd4', name: 'Accounting & Finance', code: 'ACC' },
  { id: 'd5', name: 'Procurement', code: 'PRO' },
  { id: 'd6', name: 'Human Resources', code: 'HRM' },
];

export const MOCK_POSITIONS: Position[] = [
  { id: 'p1', title: 'Managing Director', level: 'Manager' },
  { id: 'p2', title: 'Warehouse Manager', level: 'Manager' },
  { id: 'p3', title: 'Moto Parts Specialist', level: 'Senior' },
  { id: 'p4', title: 'Forklift Operator', level: 'Entry' },
  { id: 'p5', title: 'Sales Representative', level: 'Entry' },
  { id: 'p6', title: 'Lead Accountant', level: 'Senior' },
  { id: 'p7', title: 'Import/Export Coordinator', level: 'Senior' },
  { id: 'p8', title: 'Counter Cashier', level: 'Entry' },
  { id: 'p9', title: 'HR Officer', level: 'Senior' },
  { id: 'p10', title: 'Delivery Driver', level: 'Entry' },
];

// Helper to generate some employees
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp1',
    employeeCode: 'EMP-2020-001',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    fullName: 'Juan Dela Cruz',
    email: 'juan.dc@motorparts.ph',
    contactNo: '09171234567',
    branchId: 'b1',
    deptId: 'd1',
    positionId: 'p1',
    status: 'Regular',
    hireDate: '2020-01-15',
    sssNo: '33-1234567-8',
    philHealthNo: '12-345678901-2',
    tin: '123-456-789-000',
    pagibigNo: '1212-3434-5656',
    dailyRate: 2500,
    monthlyRate: 55000,
    avatarUrl: 'https://i.pravatar.cc/150?u=emp1'
  },
  {
    id: 'emp2',
    employeeCode: 'EMP-2021-022',
    firstName: 'Somchai',
    lastName: 'Sawadee',
    fullName: 'Somchai Sawadee',
    email: 'somchai.s@motorparts.th',
    contactNo: '+66 81 234 5678',
    branchId: 'b4',
    deptId: 'd5',
    positionId: 'p7',
    status: 'Regular',
    hireDate: '2021-03-10',
    dailyRate: 3000,
    monthlyRate: 65000,
    avatarUrl: 'https://i.pravatar.cc/150?u=emp2'
  },
  {
    id: 'emp3',
    employeeCode: 'EMP-2022-045',
    firstName: 'Maria',
    lastName: 'Santos',
    fullName: 'Maria Santos',
    email: 'maria.s@motorparts.ph',
    contactNo: '09187654321',
    branchId: 'b2',
    deptId: 'd2',
    positionId: 'p2',
    status: 'Regular',
    hireDate: '2022-06-20',
    sssNo: '03-9876543-1',
    philHealthNo: '55-667788990-1',
    tin: '987-654-321-000',
    dailyRate: 1800,
    monthlyRate: 40000,
    avatarUrl: 'https://i.pravatar.cc/150?u=emp3'
  },
  // Adding a warehouse picker
  {
    id: 'emp4',
    employeeCode: 'EMP-2023-112',
    firstName: 'Ricardo',
    lastName: 'Dalisay',
    fullName: 'Ricardo Dalisay',
    email: 'ricardo.d@motorparts.ph',
    contactNo: '09223334444',
    branchId: 'b2',
    deptId: 'd2',
    positionId: 'p4',
    status: 'Probationary',
    hireDate: '2023-11-01',
    dailyRate: 610,
    monthlyRate: 15860,
    avatarUrl: 'https://i.pravatar.cc/150?u=emp4'
  },
  // Adding more employees to reach 50 will be done via a generator function for brevity in code but richness in data
];

// Generator for the remaining 46 employees
const generateMoreEmployees = (): Employee[] => {
  const extra: Employee[] = [];
  const firstNames = ['Jose', 'Ana', 'Lito', 'Elena', 'Mark', 'Sarah', 'Ping', 'Aoy', 'Chai', 'Waan', 'Ben', 'Grace'];
  const lastNames = ['Reyes', 'Luna', 'Garcia', 'Chen', 'Sorn', 'Phu', 'Lopez', 'Mercado', 'Tan', 'Go'];
  
  for (let i = 5; i <= 55; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const branch = MOCK_BRANCHES[i % MOCK_BRANCHES.length];
    const dept = MOCK_DEPARTMENTS[i % MOCK_DEPARTMENTS.length];
    const pos = MOCK_POSITIONS[i % MOCK_POSITIONS.length];
    
    extra.push({
      id: `emp${i}`,
      employeeCode: `EMP-2024-${i.toString().padStart(3, '0')}`,
      firstName: fn,
      lastName: ln,
      fullName: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@motorparts.ph`,
      contactNo: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
      branchId: branch.id,
      deptId: dept.id,
      positionId: pos.id,
      status: i % 10 === 0 ? 'Probationary' : i % 15 === 0 ? 'Resigned' : 'Regular',
      hireDate: `2023-${(i % 12 + 1).toString().padStart(2, '0')}-01`,
      dailyRate: 600 + (i * 20),
      monthlyRate: 15000 + (i * 500),
      avatarUrl: `https://i.pravatar.cc/150?u=emp${i}`
    });
  }
  return extra;
};

export const ALL_MOCK_EMPLOYEES = [...MOCK_EMPLOYEES, ...generateMoreEmployees()];

export const MOCK_ATTENDANCE_LOGS: AttendanceLog[] = [
  { id: 'l1', employeeId: 'emp1', date: '2024-04-16', timeIn: '08:00', timeOut: '17:05', source: 'Biometric' },
  { id: 'l2', employeeId: 'emp3', date: '2024-04-16', timeIn: '08:15', timeOut: '17:30', source: 'Biometric' },
  { id: 'l3', employeeId: 'emp4', date: '2024-04-16', timeIn: '07:55', timeOut: '16:00', source: 'Biometric' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'r1',
    employeeId: 'emp1',
    leaveType: 'Vacation',
    startDate: '2024-04-20',
    endDate: '2024-04-22',
    reason: 'Family trip to Tagaytay',
    status: 'Pending',
    appliedDate: '2024-04-10'
  },
  {
    id: 'r2',
    employeeId: 'emp4',
    leaveType: 'Sick',
    startDate: '2024-04-15',
    endDate: '2024-04-15',
    reason: 'Fever',
    status: 'Approved',
    approvedBy: 'Maria Santos',
    appliedDate: '2024-04-15'
  }
];

export const MOCK_OVERTIME: OvertimeRequest[] = [
  { id: 'o1', employeeId: 'emp4', date: '2024-04-16', hours: 2, reason: 'Unloading containers from Thailand', status: 'Pending' }
];

export const MOCK_INCIDENTS: IncidentRecord[] = [
  { id: 'i1', employeeId: 'emp4', type: 'Commendation', date: '2024-03-10', description: 'Zero breakage during high volume unloading', status: 'Resolved', severity: 'Low' }
];

export const MOCK_HOLIDAYS: Holiday[] = [
  { id: 'h1', date: '2024-01-01', name: 'New Years Day', type: 'Regular' },
  { id: 'h2', date: '2024-03-28', name: 'Maundy Thursday', type: 'Regular' },
  { id: 'h3', date: '2024-03-29', name: 'Good Friday', type: 'Regular' },
  { id: 'h4', date: '2024-04-09', name: 'Araw ng Kagitingan', type: 'Regular' },
  { id: 'h5', date: '2024-05-01', name: 'Labor Day', type: 'Regular' },
];
