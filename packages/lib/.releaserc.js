module.exports = {
  branches: [
    'master',
    {
      name: 'develop',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      { changelogFile: 'CHANGELOG.md', changelogTitle: '# Changelog' },
    ],
    ['@semantic-release/git', { assets: ['CHANGELOG.md', 'package.json'] }],
  ],
}
