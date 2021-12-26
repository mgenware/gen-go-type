import * as assert from 'assert';
import { genGoType } from '../dist/main.js';

const structString = 'struct';

it('Names and types', () => {
  assert.strictEqual(
    genGoType(structString, 'T', [
      { name: 'A', type: 'T' },
      { name: 'A_______A', type: 'T2' },
      { name: 'B', type: 'T______T' },
    ]),
    `type T struct {
\tA         T
\tA_______A T2
\tB         T______T
}
`,
  );
});

it('Tags', () => {
  assert.strictEqual(
    genGoType(structString, 'T', [
      { name: 'A', type: 'T', tag: '"_____"' },
      { name: 'A_______A', type: 'T2' },
      { name: 'B', type: 'T______T', tag: '""' },
    ]),
    `type T struct {
\tA         T        "_____"
\tA_______A T2
\tB         T______T ""
}
`,
  );
});

it('Generate constructor', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T', tag: '"_____"' },
        { name: 'A_______A', type: 'T2' },
        { name: 'B', type: 'T______T', tag: '""' },
      ],
      { ctorFunc: true },
    ),
    `type T struct {
\tA         T        "_____"
\tA_______A T2
\tB         T______T ""
}

func NewT(a T, a_______A T2, b T______T) *T {
\treturn &T{
\t\tA: a,
\t\tA_______A: a_______A,
\t\tB: b,
\t}
}
`,
  );
});

it('Generate constructor (returns value type)', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T', tag: '"_____"' },
        { name: 'A_______A', type: 'T2' },
        { name: 'B', type: 'T______T', tag: '""' },
      ],
      { ctorFunc: true, returnValueInCtor: true },
    ),
    `type T struct {
\tA         T        "_____"
\tA_______A T2
\tB         T______T ""
}

func NewT(a T, a_______A T2, b T______T) T {
\treturn T{
\t\tA: a,
\t\tA_______A: a_______A,
\t\tB: b,
\t}
}
`,
  );
});

it('Param name', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T', tag: '"_____"' },
        { name: 'A_______A', type: 'T2', paramName: 'aaa' },
        { name: 'B', type: 'T______T', tag: '""' },
      ],
      { ctorFunc: true },
    ),
    `type T struct {
\tA         T        "_____"
\tA_______A T2
\tB         T______T ""
}

func NewT(a T, aaa T2, b T______T) *T {
\treturn &T{
\t\tA: a,
\t\tA_______A: aaa,
\t\tB: b,
\t}
}
`,
  );
});

it('Headers and footers', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T' },
        { name: 'A_______A', type: 'T2' },
        { name: 'B', type: 'T______T' },
      ],
      { header: 'HEAD', footer: 'FOOT', bodyHeader: 'BODY_HEAD', bodyFooter: 'BODY_FOOT' },
    ),
    `HEADtype T struct {BODY_HEAD
\tA         T
\tA_______A T2
\tB         T______T
BODY_FOOT}FOOT
`,
  );
});

it('Base type', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T' },
        { name: 'A_______A', type: 'T2' },
        { name: 'B', type: 'T______T' },
      ],
      { ctorFunc: true, returnValueInCtor: true },
      [{ name: 'User', paramName: 'user' }],
    ),
    `type T struct {
\tUser

\tA         T
\tA_______A T2
\tB         T______T
}

func NewT(user *User, a T, a_______A T2, b T______T) T {
\treturn T{
\t\tUser: *user,
\t\tA: a,
\t\tA_______A: a_______A,
\t\tB: b,
\t}
}
`,
  );
});

it('Multiple types and package names', () => {
  assert.strictEqual(
    genGoType(
      structString,
      'T',
      [
        { name: 'A', type: 'T' },
        { name: 'A_______A', type: 'T2' },
        { name: 'B', type: 'T______T' },
      ],
      { ctorFunc: true, returnValueInCtor: true },
      [
        { name: 'Post', paramName: 'p', packageName: 'post' },
        { name: 'User', paramName: 'user' },
      ],
    ),
    `type T struct {
\tpost.Post
\tUser

\tA         T
\tA_______A T2
\tB         T______T
}

func NewT(p *post.Post, user *User, a T, a_______A T2, b T______T) T {
\treturn T{
\t\tPost: *p,
\t\tUser: *user,
\t\tA: a,
\t\tA_______A: a_______A,
\t\tB: b,
\t}
}
`,
  );
});
