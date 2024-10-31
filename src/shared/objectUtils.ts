export const hasOwnProperties = <T>(
  obj: unknown,
  props: (keyof T)[]
): obj is T =>
  typeof obj === 'object' && obj !== null && props.every((prop) => prop in obj);
