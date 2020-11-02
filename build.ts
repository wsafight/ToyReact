require('esbuild').build({
  entryPoints: ['main.tsx'],
  jsxFactory: 'createElement',
  bundle: true,
  target: 'es6',
  outfile: 'dist/main.js',
}).catch(() => process.exit(1))