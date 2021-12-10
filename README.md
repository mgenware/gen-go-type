# gen-go-type

[![Build Status](https://github.com/mgenware/gen-go-type/workflows/Build/badge.svg)](https://github.com/mgenware/gen-go-type/actions)
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

Use `Options.ctorFunc` to generate a constructor:

```ts
import { genGoType } from 'gen-go-type';

const goCode = genGoType(
  'struct',
  'T',
  [
    { name: 'A', type: 'T', tag: '"_____"' },
    { name: 'A_______B', type: 'T2' },
    { name: 'C', type: 'T______3', tag: '""' },
  ],
  { ctorFunc: true },
);

/*
type T struct {
    A         T        "_____"
    A_______B T2
    C         T______3 ""
}

func NewT(a T, a_______A T2, b T______T) *T {
    return &T{
        A: a,
        A_______A: a_______A,
        B: b,
    }
}
 */
```

To generate a constructor returning a value type instead of a pointer, set `Options.returnValueInCtor` to `true`:

```ts
import { genGoType } from 'gen-go-type';

const goCode = genGoType(
  'struct',
  'T',
  [
    { name: 'A', type: 'T', tag: '"_____"' },
    { name: 'A_______B', type: 'T2' },
    { name: 'C', type: 'T______3', tag: '""' },
  ],
  { ctorFunc: true, returnValueInCtor: true },
);

/*
type T struct {
    A         T        "_____"
    A_______B T2
    C         T______3 ""
}

func NewT(a T, a_______A T2, b T______T) T {
    return T{
        A: a,
        A_______A: a_______A,
        B: b,
    }
}
 */
```
