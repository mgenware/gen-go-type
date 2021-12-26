export interface TypeMember {
  type: string;
  name: string;
  tag?: string;
  paramName?: string;
}

export interface BaseType {
  name: string;
  paramName: string;
  packageName?: string;
}

export interface Options {
  ctorFunc?: boolean;
  returnValueInCtor?: boolean;
  header?: string;
  footer?: string;
  bodyHeader?: string;
  bodyFooter?: string;
}

function lowerFirstLetter(s: string): string {
  return s.charAt(0).toLowerCase() + s.substring(1);
}

function memberParamName(m: TypeMember): string {
  return m.paramName || lowerFirstLetter(m.name);
}

function getFullTypeString(type: BaseType) {
  return type.packageName ? `${type.packageName}.${type.name}` : type.name;
}

export function genGoType(
  type: string,
  name: string,
  members: TypeMember[],
  opt?: Options,
  baseTypes?: BaseType[],
): string {
  let s = `${opt?.header || ''}type ${name} ${type} {${opt?.bodyHeader || ''}\n`;
  if (baseTypes) {
    for (const bt of baseTypes) {
      s += `\t${getFullTypeString(bt)}\n`;
    }
    s += '\n';
  }
  const maxNameLen = Math.max(...members.map((m) => m.name.length));
  const maxTypeLen = Math.max(...members.map((m) => m.type.length));
  for (const mem of members) {
    s += `\t${mem.name.padEnd(maxNameLen)} ${mem.tag ? mem.type.padEnd(maxTypeLen) : mem.type}`;
    if (mem.tag) {
      s += ` ${mem.tag}`;
    }
    s += '\n';
  }
  s += `${opt?.bodyFooter || ''}}${opt?.footer || ''}\n`;

  if (opt?.ctorFunc) {
    let params = members.map((m) => `${memberParamName(m)} ${m.type}`).join(', ');
    if (baseTypes) {
      const btParams = baseTypes.map((t) => `${t.paramName} *${getFullTypeString(t)}, `).join('');
      params = btParams + params;
    }
    s += `\nfunc New${name}(${params}) ${opt?.returnValueInCtor ? '' : '*'}${name} {\n`;
    s += `\treturn ${opt?.returnValueInCtor ? '' : '&'}${name}{\n`;
    if (baseTypes) {
      for (const bt of baseTypes) {
        s += `\t\t${bt.name}: *${bt.paramName},\n`;
      }
    }
    for (const m of members) {
      s += `\t\t${m.name}: ${memberParamName(m)},\n`;
    }
    s += '\t}\n';
    s += '}\n';
  }

  return s;
}
