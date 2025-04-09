import { writeFileSync } from 'fs';
import path from 'path';

export function saveTestData(filename: string, data: any) {
  const filePath = path.resolve(__dirname, '../test-data', filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
