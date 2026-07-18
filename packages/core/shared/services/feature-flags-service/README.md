# Features flags

Allows you to hide functionality

**Main files**:

- `packages/core/shared/services/feature-flags-service/feature-flags-service.ts` - Flag checking service

**Instructions**:

1. Add a flag for the feature to the file `feature-flags.ts`
2. Add flag to `.env`

**Example of an entry in .env**:

```
FEATURE_FLAGS=["develop", "askAI"]
```

**Example of use**:

For example, if you need to hide something, you add the `qualificationRequirements` flag to the `feature-flags.ts` file and add a check:

```js
import { FeatureFlagsService } from 'apps/kana/src/shared/services/feature-flags-service/feature-flags-service';

{FeatureFlagsService.isEnabled('qualificationRequirements') && (
  ...
)}
```
