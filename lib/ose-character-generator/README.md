# OSE Character Generator Library

Self-contained browser ESM library for generating Old-School Essentials characters.

## What To Copy

Copy the entire `ose-character-generator` folder into your target project.

## Quick Start

```html
<script type="module">
  import { createOseCharacterGenerator } from "./ose-character-generator/index.js";

  const generator = createOseCharacterGenerator();

  const characters = generator.generateCharacterBatch({
    count: 3,
    minScoreTotal: 54,
    allowedClassNames: generator.getAvailableClassNames(),
    level: 1
  });

  console.log(characters);
</script>
```

## API

- `createOseCharacterGenerator(options?)`
- `generateCharacterBatch(config, options?)`
- `getAvailableClassNames(allowedSources?)`
- `OseClasses`

### createOseCharacterGenerator(options?)

Options are optional:

- `rng: () => number`
- `getSingleName: (gender, rng) => string`
- `rollBackground: (rng) => string`

The returned generator has:

- `getAvailableClasses()`
- `getAvailableClassNames()`
- `generateCharacter(config)`
- `generateCharacterBatch(config)`

### Config Shape

```js
{
  count: number,
  minScoreTotal: number,
  allowedClassNames: string[],
  level: number
}
```

## Notes

- The folder includes all class data, constants, names, and background tables.
- No imports outside this folder are required.
- The modules are plain JavaScript ESM and work in modern browsers.
