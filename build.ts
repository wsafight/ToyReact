require('esbuild').build({
  entryPoints: ['main.tsx'],
  jsxFactory: 'createElement',
  bundle: true,
  outfile: 'dist/main.js',
}).catch(() => process.exit(1))