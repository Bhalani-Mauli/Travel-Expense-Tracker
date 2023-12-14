export function uuid(length: number): string {
  return Math.random().toString(length).replace("0.", "PREFIX_");
}
