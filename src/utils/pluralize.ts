export function pluralize(
  n: number,
  singular: string,
  plural: string,
  included = true
) {
  return `${included ? `${n} ` : ''}${n === 1 ? singular : plural}`;
}
