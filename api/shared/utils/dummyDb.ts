// TODO: replace with real DB calls

export function dummyCashBalance(userId: number = null) {
  if (userId === null) { return null; }

  if (userId === 9999) {
    return 1976;
  } else {
    return null;
  }
}
