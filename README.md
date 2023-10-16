# `eslint-plugin-no-re-export`

[![npm version](https://badge.fury.io/js/eslint-plugin-no-re-export.svg)](https://badge.fury.io/js/eslint-plugin-no-re-export)
[![Build Status](https://travis-ci.org/azu/eslint-plugin-no-re-export.svg?branch=master)](https://travis-ci.org/azu/eslint-plugin-no-re-export)

Disallow re-exporting in TypeScript/JavaScript.

## Installation

```sh
# npm
npm install eslint-plugin-no-re-export --save-dev

# yarn
yarn add eslint-plugin-no-re-export --dev

# bun
bun install eslint-plugin-no-re-export --save-dev
```

## Usage

Add `no-re-export` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["no-re-export"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "no-re-export/no-re-export": "error"
  }
}
```

## Rules

| Rule ID | Description |
|:--------|:------------|
| [no-re-export](./src/docs/no-re-export.md) | disallow re-exporting in TypeScript/JavaScript |

## References

- [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/) by @marvinhagemeister
- [Burn the Barrel!](https://uglow.medium.com/burn-the-barrel-c282578f21b6#:~:text=%E2%80%9CThe%20problem%20is%20that%20Jest,like%20%40mui%2Fmaterial%20.%E2%80%9D) by @uglow
- [Your Next.js Bundle Will Thank You](https://renatopozzi.me/articles/your-nextjs-bundle-will-thank-you) by @askides
- [Barrel files in JavaScript](https://flaming.codes/posts/barrel-files-in-javascript) by @flaming-codes
- Comment by @ljharb at [eslint-plugin-import/issues/1920](https://github.com/import-js/eslint-plugin-import/issues/1920)

  > Barrel exports increase bundle size and memory footprint, and are the only reason treeshaking is needed (to only-partially clean up sloppy importing), and in my experience, are best avoided, especially in any codebase of significant scale/size.
