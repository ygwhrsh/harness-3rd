import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
        },
      },
    },
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
