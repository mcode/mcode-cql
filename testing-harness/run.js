#!/usr/bin/env node

const { spawn } = require('child_process');

const args = process.argv.slice(2);
if (process.platform === 'win32') {
  spawn('testing-harness\\scripts\\run_tests.bat', args, { stdio: 'inherit' });
} else {
  spawn('./testing-harness/scripts/run_tests.sh', args, { stdio: 'inherit' });
}
