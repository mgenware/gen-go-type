export interface TypeMember {
  type: string;
  name: string;
  tag?: string;
  paramName?: string;
}

export interface Options {
  ctorFunc?: boolean;
  returnValueInCtor?: boolean;
}

function lowerFirstLetter(s: string): string {
  return s.charAt(0).toLowerCase() + s.substring(1);
}

function memberParamName(m: TypeMember): string {
  return m.paramName || lowerFirstLetter(m.name);
}

export function genGoType(
  type: string,
  name: string,
  members: TypeMember[],
  opt?: Options,
): string {
  let s = `type ${name} ${type} {\n`;
  const maxNameLen = Math.max(...members.map((m) => m.name.length));
  const maxTypeLen = Math.max(...members.map((m) => m.type.length));
  for (const mem of members) {
    s += `\t${mem.name.padEnd(maxNameLen)} ${mem.tag ? mem.type.padEnd(maxTypeLen) : mem.type}`;
    if (mem.tag) {
      s += ` ${mem.tag}`;
    }
    s += '\n';
  }
  s += '}\n';

  if (opt?.ctorFunc) {
    const params = members.map((m) => `${memberParamName(m)} ${m.type}`).join(', ');
    s += `\nfunc New${name}(${params}) ${opt?.returnValueInCtor ? '' : '*'}${name} {\n`;
    s += `\treturn ${opt?.returnValueInCtor ? '' : '&'}${name}{\n`;
    for (const m of members) {
      s += `\t\t${m.name}: ${memberParamName(m)},\n`;
    }
    s += '\t}\n';
    s += '}\n';
  }

  return s;
}
