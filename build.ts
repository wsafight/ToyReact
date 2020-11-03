require('esbuild').build({
  entryPoints: ['main.tsx'],
  jsxFactory: 'createElement',
  bundle: true,
  target: 'es6',
  outfile: 'dist/main.min.js',
}).catch(() => process.exit(1))