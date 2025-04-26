export const EmptyClass = class {};

export function isEmpty(value: string | any[] | null | undefined) {
  
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
}

export function isArrayOfObejcts(input: any[]): boolean {
  return input.every(item => typeof item === 'object' && item !== null && !Array.isArray(item));
}

export function isArrayOfStrings(input: any[]): boolean {
  return input.every(item => typeof item === 'string' && item !== null && !Array.isArray(item));
}