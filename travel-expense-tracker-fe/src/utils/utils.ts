export function uuid(length: number): string {
  return Math.random().toString(length).replace("0.", "PREFIX_");
}

export function roundNumber(number: number): number {
  return Number(number.toFixed(1));
}

export const dateToHumanReadable = (createdAt: string) => {
  var date = new Date(createdAt);
  return (
    date.getDate() +
    " " +
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear()
  );
};
