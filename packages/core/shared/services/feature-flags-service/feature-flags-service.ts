export type FeatureFlags = string;

class FeatureFlagsServiceClass {
  private _availableFlags: string[] = [];

  constructor() {
    let envFlags: string[] = [];

    try {
      envFlags = process.env.FEATURE_FLAGS ? JSON.parse(process.env.FEATURE_FLAGS) : [];
    } catch (_) {
      console.error(`
        Invalid FEATURE_FLAGS, place array of available feature flags.
        For example: ["develop", "askAI"]
      `);
    }

    this._availableFlags = envFlags;
  }

  public get availableFlags(): string[] {
    return this._availableFlags;
  }

  isEnabled(flag: FeatureFlags): boolean;
  isEnabled(flags: FeatureFlags[]): boolean;
  isEnabled(flagOrFlags: FeatureFlags | FeatureFlags[]): boolean {
    if (Array.isArray(flagOrFlags)) {
      return flagOrFlags.every((flag) => this._availableFlags.includes(flag));
    } else {
      return this._availableFlags.includes(flagOrFlags);
    }
  }
}

export const FeatureFlagsService = new FeatureFlagsServiceClass();
