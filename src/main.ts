export interface TypeMember {
  type: string;
  name: string;
  tag?: string;
}

export function genGoType(type: string, name: string, members: TypeMember[]): string {
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
  return s;
}
