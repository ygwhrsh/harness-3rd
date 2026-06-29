import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['v3-*.ts', 'v3-*.tsx'],
      exclude: ['node_modules', 'dist', '**/*.test.ts', '**/*.test.tsx', 'tests/'],
      lines: 85,
      functions: 80,
      branches: 75,
      statements: 85,
    },
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', 'dist', 'tests/'],
  },
});
