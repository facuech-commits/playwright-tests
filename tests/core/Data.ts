import path from 'node:path';
import { pathToFileURL } from 'node:url';

export class Data {
  private static readonly cache = new Map<string, Record<string, unknown>>();

  static unique(name: string): string {
    return `${name} ${Date.now()}`;
  }

  static async getCase<T extends { id: string }>(filePath: string, id: string): Promise<T> {
    const module = await Data.load(filePath);
    if (!Array.isArray(module.default)) {
      throw new TypeError(`Data.getCase: ${filePath} has no "export default" array of cases`);
    }

    const found = (module.default as T[]).find((c) => c.id === id);
    if (!found) {
      throw new Error(`Data.getCase: no case with id "${id}" found in ${filePath}`);
    }
    return found;
  }

  static async getValue<T>(filePath: string, exportName: string): Promise<T> {
    const module = await Data.load(filePath);
    if (!(exportName in module)) {
      throw new Error(`Data.getValue: ${filePath} has no export named "${exportName}"`);
    }
    return module[exportName] as T;
  }

  private static async load(filePath: string): Promise<Record<string, unknown>> {
    const cached = Data.cache.get(filePath);
    if (cached) {
      return cached;
    }

    let loaded: Record<string, unknown>;
    try {
      const absolutePath = path.resolve(process.cwd(), filePath);
      loaded = await import(pathToFileURL(absolutePath).href);
    } catch (error) {
      throw new Error(`Data: data file not found: ${filePath}`, { cause: error });
    }

    Data.cache.set(filePath, loaded);
    return loaded;
  }
}
