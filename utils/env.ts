export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Create a .env file (see .env.example) or set it as a CI secret.`,
    );
  }

  return value;
}
