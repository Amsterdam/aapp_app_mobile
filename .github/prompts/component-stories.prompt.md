---
agent: 'agent'
description: 'Create a Storybook .stories.tsx file and matching .docs.mdx file for a component.'
---

Create a complete Storybook setup for the selected component:

- a `.stories.tsx` file
- a matching `.docs.mdx` file

Start by inspecting the component and one nearby Storybook example before editing.

Follow these repository conventions:

- place the story file next to the component as `ComponentName.stories.tsx`
- place the docs file next to the component as `ComponentName.docs.mdx`
- use `@storybook/react-native-web-vite` types and local Storybook patterns from nearby files
- when adding a manual `.docs.mdx` file, disable autodocs in the story meta with `tags: ['!autodocs']`
- if the component has a Figma or design reference in nearby stories, preserve that pattern in `parameters.design`
- reuse local helpers for controls and arg types when relevant instead of inventing new ones
- keep story names clear and user-facing
- never abbreviate variable names
- keep diffs minimal

Build the story file so it:

- exports a typed `meta` object as the default export
- includes focused stories for the main states and variants of the component
- uses realistic args
- adds `argTypes`, `parameters`, and `render` only where they provide value
- covers important states such as default, disabled, loading, selected, error, or layout variants when they apply

Build the docs file so it:

- imports the Storybook docs blocks used in local examples
- imports all stories from the matching `.stories.tsx` file
- uses `<Meta of={...} />`, `<Title />`, `<Subtitle />`, `<Primary />`, `<Stories />`, and `<Controls />`
- includes concise human-readable sections such as when to use, key states to review, and do's and don'ts when that information can be inferred safely from the component
- stays product- and UX-focused rather than implementation-focused

If the component API or intended usage is unclear, ask only the minimum clarifying questions needed to choose the right story states and docs guidance.

After the first substantive edit, run the narrowest relevant validation available for the created files before widening scope.

Expected result:

- a new or updated `.stories.tsx` file for the component
- a matching `.docs.mdx` file
- a short summary of the covered states, any assumptions, and what validation ran
