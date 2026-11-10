Never abbreviate variable names. For example, use `district` instead of `dist` and `selectedDistrict` instead of `selDist`.

In /src/modules we have several mini projects called 'modules'.

## Documentation rules

- Update documentation when relevant.
- Store each module's documentation in a separate Markdown file under `/.docs/modules`.
- Store all general documentation in `/.docs/`.
- Write documentation in clear, concise English. Include the following information:
  - The purpose of the module
  - The main business rules
  - Any major non-standard architectural decisions
- The documentation should not include any implementation details, such as the names of components or functions.
- It should focus on the business logic and the purpose of the module.

## Coding rules

- Whenever new UI elements are build or existing UI elements are changed, add- or change Storybook stories.
