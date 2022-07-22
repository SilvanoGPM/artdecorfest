export function titleString(string: string) {
  const [first, ...rest] = string;

  return `${first.toUpperCase()}${rest.join('')}`;
}
