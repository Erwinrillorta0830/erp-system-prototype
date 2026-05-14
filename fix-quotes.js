const fs = require('fs');

const fixes = [
  {
    file: 'src/modules/crm/views/ActivityCenter.tsx',
    find: `"{activity.notes}"`,
    replace: `&quot;{activity.notes}&quot;`
  },
  {
    file: 'src/modules/crm/views/CRMDashboard.tsx',
    find: `hasn't purchased`,
    replace: `hasn&apos;t purchased`
  },
  {
    file: 'src/modules/crm/views/ComplaintsHub.tsx',
    find: `"Damaged" or "Wrong Part"`,
    replace: `&quot;Damaged&quot; or &quot;Wrong Part&quot;`
  },
  {
    file: 'src/modules/crm/views/Customer360.tsx',
    find: `hasn't ordered`,
    replace: `hasn&apos;t ordered`
  },
  {
    file: 'src/modules/crm/views/Customer360.tsx',
    find: `"{activity.notes}"`,
    replace: `&quot;{activity.notes}&quot;`
  },
  {
    file: 'src/modules/hrm/views/AttendanceHub.tsx',
    find: `today's`,
    replace: `today&apos;s`
  },
  {
    file: 'src/modules/hrm/views/RequestCenter.tsx',
    find: `"In Progress"`,
    replace: `&quot;In Progress&quot;`
  },
  {
    file: 'src/modules/hrm/views/RequestCenter.tsx',
    find: `"For Approval"`,
    replace: `&quot;For Approval&quot;`
  },
  {
    file: 'src/modules/sales/views/SalesDashboard.tsx',
    find: `doesn't`,
    replace: `doesn&apos;t`
  },
  {
    file: 'src/modules/sales/views/SalesDashboard.tsx',
    find: `hasn't`,
    replace: `hasn&apos;t`
  },
  {
    file: 'src/modules/sales/views/SalesDashboard.tsx',
    find: `today's`,
    replace: `today&apos;s`
  },
  {
    file: 'src/modules/scm/views/InventoryView.tsx',
    find: `"A" class`,
    replace: `&quot;A&quot; class`
  },
  {
    file: 'src/modules/scm/views/InventoryView.tsx',
    find: `"A"`,
    replace: `&quot;A&quot;`
  },
  {
    file: 'src/modules/scm/views/LandedCostAllocation.tsx',
    find: `"Awaiting Allocation"`,
    replace: `&quot;Awaiting Allocation&quot;`
  }
];

for (const fix of fixes) {
  try {
    let content = fs.readFileSync(fix.file, 'utf8');
    content = content.replaceAll(fix.find, fix.replace);
    fs.writeFileSync(fix.file, content);
  } catch(e) {}
}
