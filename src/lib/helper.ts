const memo: { [key: number]: number } = {};

export function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  if (memo[n]) return memo[n];
  return (memo[n] = n * factorial(n - 1));
}
export function triangular(n: number): number {
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
}
