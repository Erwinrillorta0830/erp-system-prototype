const fs = require('fs');
const content = fs.readFileSync('lint.json', 'utf16le');
const cleanContent = content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
const data = JSON.parse(cleanContent);

const errors = [];

for (const file of data) {
  const fileErrors = file.messages.filter(m => m.severity === 2);
  if (fileErrors.length > 0) {
    errors.push({
      filePath: file.filePath,
      errors: fileErrors.map(e => ({
        line: e.line,
        column: e.column,
        ruleId: e.ruleId,
        message: e.message
      }))
    });
  }
}

fs.writeFileSync('lint-errors.json', JSON.stringify(errors, null, 2));
console.log('Errors extracted to lint-errors.json');
