# gen-go-type

[![Build Status](https://github.com/mgenware/gen-go-type/workflows/Build/badge.svg)](https://github.com/mgenware/gen-go-type/actions)
[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/gen-go-type)
[![npm version](https://img.shields.io/npm/v/gen-go-type.svg?style=flat-square)](https://npmjs.com/package/gen-go-type)
[![Node.js Version](http://img.shields.io/node/v/gen-go-type.svg?style=flat-square)](https://nodejs.org/en/)

Generate a formatted Go type string in JavaScript.

## Installation

```sh
npm i gen-go-type
```

## Usage

```ts
import { genGoType } from 'gen-go-type';

const goCode = genGoType('struct', 'T', [
  { name: 'A', type: 'T', tag: '"_____"' },
  { name: 'A_______B', type: 'T2' },
  { name: 'C', type: 'T______3', tag: '""' },
]);

/*
type T struct {
    A         T        "_____"
    A_______B T2
    C         T______3 ""
}
 */
```
