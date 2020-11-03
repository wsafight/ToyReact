require('esbuild').build({
  entryPoints: ['main.tsx'],
  jsxFactory: 'createElement',
  bundle: true,
  minify: true,
  outfile: 'dist/main.min.js',
}).catch(() => process.exit(1))