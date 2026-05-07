#!/usr/bin/env node

/**
 * Page Audit Script
 * 
 * Detects hardcoded values that should use design tokens.
 * 
 * Usage:
 *   node scripts/audit-page.js src/pages/Rio.js
 *   node scripts/audit-page.js src/pages/*.js
 */

const fs = require('fs');
const path = require('path');

// Patterns to detect
const PATTERNS = {
  hexColors: {
    regex: /text-\[#[0-9a-fA-F]{3,6}\]|bg-\[#[0-9a-fA-F]{3,6}\]|border-\[#[0-9a-fA-F]{3,6}\]/g,
    message: 'Hardcoded hex color — use tokens (text-gold, text-text-primary, etc.)',
    severity: 'ERROR'
  },
  arbitrarySpacing: {
    regex: /mt-\[\d+px\]|mb-\[\d+px\]|py-\[\d+px\]|h-\[\d+vh\]|w-\[\d+px\]/g,
    message: 'Arbitrary spacing — use tokens (mt-section, py-bridge, h-hero, etc.)',
    severity: 'WARNING'
  },
  arbitraryShadows: {
    regex: /shadow-\[.*?\]/g,
    message: 'Arbitrary shadow — use tokens.shadows',
    severity: 'ERROR'
  },
  inlineOpacity: {
    regex: /bg-black\/\d+|bg-white\/\d+/g,
    message: 'Inline opacity — use tokens.colors.overlay',
    severity: 'WARNING'
  },
  inconsistentRadius: {
    regex: /rounded-sm/g,
    message: 'Inconsistent radius — use rounded-lg (tokens.radius.lg)',
    severity: 'WARNING'
  }
};

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    Object.entries(PATTERNS).forEach(([patternName, pattern]) => {
      const matches = line.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          issues.push({
            line: index + 1,
            severity: pattern.severity,
            pattern: patternName,
            match: match,
            message: pattern.message
          });
        });
      }
    });
  });

  return issues;
}

function printReport(filePath, issues) {
  console.log('\n' + '='.repeat(60));
  console.log(`AUDIT: ${path.relative(process.cwd(), filePath)}`);
  console.log('='.repeat(60));

  if (issues.length === 0) {
    console.log('✅ No issues found — page follows token system!');
    return;
  }

  const errors = issues.filter(i => i.severity === 'ERROR');
  const warnings = issues.filter(i => i.severity === 'WARNING');

  console.log(`\nFound ${errors.length} errors, ${warnings.length} warnings\n`);

  // Group by line
  const byLine = issues.reduce((acc, issue) => {
    if (!acc[issue.line]) acc[issue.line] = [];
    acc[issue.line].push(issue);
    return acc;
  }, {});

  Object.entries(byLine)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([line, lineIssues]) => {
      console.log(`Line ${line}:`);
      lineIssues.forEach(issue => {
        const icon = issue.severity === 'ERROR' ? '❌' : '⚠️';
        console.log(`  ${icon} ${issue.match}`);
        console.log(`     → ${issue.message}`);
      });
      console.log('');
    });

  console.log('-'.repeat(60));
  console.log('Migration: Replace with tokens from src/styles/tokens.js');
  console.log('See MIGRATION_AUDIT.md for reference');
}

// Main
const files = process.argv.slice(2);

if (files.length === 0) {
  console.log('Usage: node audit-page.js <file-path> [<file-path>...]');
  console.log('Example: node audit-page.js src/pages/Rio.js');
  process.exit(1);
}

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  const issues = auditFile(file);
  printReport(file, issues);
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('AUDIT COMPLETE');
console.log('='.repeat(60));
console.log('Next: Fix ERRORs first, then WARNINGs');
console.log('Reference: MIGRATION_AUDIT.md');
