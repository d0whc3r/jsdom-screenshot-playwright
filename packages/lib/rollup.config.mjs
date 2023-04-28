import typescript from '@rollup/plugin-typescript'
import packageJson from './package.json' assert {type: 'json'}

/** @type {import('rollup').RollupOptions} */
const inputOptions = {
  input: 'src/index.ts',
  cache: true,
  plugins: [
    typescript({
      compilerOptions: { module: 'ESNext' },
    }),
  ],
  external: ['playwright', 'os', 'path', 'fs'],
  output: [{
    file: packageJson.main,
    format: 'cjs',
    exports: 'named',
    sourcemap: false,
  }, {
    file: packageJson.module,
    format: 'esm',
    exports: 'named',
    sourcemap: false,
  }],
}

export default inputOptions
