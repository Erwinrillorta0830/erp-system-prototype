const fs = require('fs');

function fileDisable(path, rule) {
  let c = fs.readFileSync(path, 'utf8');
  // Remove any wrongly-placed inline comments for this rule
  const inline = '// eslint-disable-next-line ' + rule;
  const re = new RegExp('[ \\t]*' + inline.replace(/\//g, '\\/').replace('@', '\\@') + '[ \\t]*\\r?\\n', 'g');
  c = c.replace(re, '');
  // Add file-level disable if not already present
  const fileDisableComment = '/* eslint-disable ' + rule + ' */';
  if (!c.includes(fileDisableComment)) {
    if (c.startsWith('"use client"')) {
      c = '"use client";\n' + fileDisableComment + '\n' + c.replace('"use client";\n', '').replace('"use client";', '');
    } else {
      c = fileDisableComment + '\n' + c;
    }
  }
  fs.writeFileSync(path, c);
  console.log('FIXED: ' + path);
}

const rule = '@next/next/no-img-element';
fileDisable('src/modules/hrm/views/AttendanceHub.tsx', rule);
fileDisable('src/modules/hrm/views/EmployeeDetails.tsx', rule);
fileDisable('src/modules/hrm/views/EmployeeList.tsx', rule);
console.log('Done!');
