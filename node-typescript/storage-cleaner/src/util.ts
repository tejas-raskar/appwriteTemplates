/**
 * Returns a date subtracted by the retention period from the current date.
 * The retention period is fetched from the RETENTION_PERIOD_DAYS environment variable.
 * Defaults to 30 days if the environment variable is not set or invalid.
 * @returns {string} The calculated expiry date in ISO 8601 format.
 */
export function getExpiryDate(): string {
  const retentionPeriod = Number(process.env.RETENTION_PERIOD_DAYS ?? 30);
  return new Date(
    Date.now() - retentionPeriod * 24 * 60 * 60 * 1000
  ).toISOString();
}

/**
 * Throws an error if any of the keys are missing from the object
 * @param {*} obj
 * @param {string[]} keys
 * @throws {Error}
 */
export function throwIfMissing(obj: any, keys: string[]) {
  const missing: string[] = [];
  for (let key of keys) {
    if (!(key in obj && obj[key] !== 0)) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}
