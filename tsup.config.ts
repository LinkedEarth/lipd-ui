import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  external: [
    'react',
    'react-dom',
    '@mui/*',
    '@emotion/*',
    'mapbox-gl',
    'lipdjs',
    'zustand'
  ],
  esbuildOptions(options) {
    options.conditions = ['module', 'import'];
  },
  splitting: false,
  treeshake: true,
  minify: false
}); 