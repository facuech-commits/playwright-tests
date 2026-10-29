export class Env {
  static str(name: string, def?: string): string {
    const value = process.env[name];

    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    } else if (typeof def === 'string') {
      return def;
    }

    throw new Error(`Missing or invalid environment variable: '${name}'`);
  }

  static bool(name: string, def?: boolean): boolean {
    const value = Env.str(name, String(def));
    return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
  }
}
