import { readFileSync } from 'fs';
import path from 'path';

export function loadTestData <T = any> (filename: string): T {
  const filePath = path.resolve(__dirname, '../test-data', filename);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
