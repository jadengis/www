// TypeScript 7 ships no programmatic API until 7.1, so the organize-imports
// prettier plugin would silently no-op against the project's typescript@7 peer.
// Give it Microsoft's TS6 compat package as a real dependency instead, so its
// require('typescript') resolves to a working API (tsc stays on 7).
function readPackage(pkg) {
  if (pkg.name === 'prettier-plugin-organize-imports') {
    delete pkg.peerDependencies.typescript
    pkg.dependencies = {
      ...pkg.dependencies,
      typescript: 'npm:@typescript/typescript6@^6.0.2',
    }
  }
  return pkg
}

module.exports = { hooks: { readPackage } }
