const context: { [key: string]: any } = {};

export const createContext = <T>(value: T, key: string): T => {
  context[key] = value;
  return value;
};

export const useContext = <T>(key: string): T => {
  if (!(key in context)) {
    throw new Error("[useContext] Your key is not in context");
  }

  return context[key] as T;
};
