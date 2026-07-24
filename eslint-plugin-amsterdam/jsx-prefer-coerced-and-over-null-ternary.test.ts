import {rule} from './jsx-prefer-coerced-and-over-null-ternary.mts'
import {ruleTester} from './utils/ruleTester'

ruleTester.run('jsx-prefer-coerced-and-over-null-ternary', rule, {
  valid: [
    {
      code: `const errorMessage = "Error";
<App>{!!errorMessage && <Paragraph>{errorMessage}</Paragraph>}</App>`,
    },
    {
      code: `const count = 0;
<App>{count ? <Paragraph>{count}</Paragraph> : <Paragraph>Empty</Paragraph>}</App>`,
    },
    {
      code: `const hasError = true;
<App>{hasError ? <Paragraph>Error</Paragraph> : false}</App>`,
    },
    {
      code: `const errorMessage = "Error";
<App helperText={errorMessage ? <Paragraph>{errorMessage}</Paragraph> : null} />`,
    },
    {
      code: `const errorMessage = "Error";
<App helperText={<Paragraph>{errorMessage ? "Error" : null}</Paragraph>} />`,
    },
  ],
  invalid: [
    {
      code: `const errorMessage = "Error";
<App>{errorMessage ? <Paragraph>{errorMessage}</Paragraph> : null}</App>`,
      errors: [{messageId: 'preferCoercedAnd'}],
      output: `const errorMessage = "Error";
<App>{!!errorMessage && <Paragraph>{errorMessage}</Paragraph>}</App>`,
    },
    {
      code: `const count = 1;
<App>{count > 0 ? <Paragraph>{count}</Paragraph> : null}</App>`,
      errors: [{messageId: 'preferCoercedAnd'}],
      output: `const count = 1;
<App>{!!(count > 0) && <Paragraph>{count}</Paragraph>}</App>`,
    },
    {
      code: `const list = [1, 2, 3];
<App>{list.length ? <Paragraph>{list.length}</Paragraph> : null}</App>`,
      errors: [{messageId: 'preferCoercedAnd'}],
      output: `const list = [1, 2, 3];
<App>{!!list.length && <Paragraph>{list.length}</Paragraph>}</App>`,
    },
    {
      code: `const list = [1, 2, 3];
const icon = 'hi';
<App>{!!list.length && !icon ? list.length : null}</App>`,
      errors: [{messageId: 'preferCoercedAnd'}],
      output: `const list = [1, 2, 3];
const icon = 'hi';
<App>{!!list.length && !icon && list.length}</App>`,
    },
    {
      code: `const list = [1, 2, 3];
const maxLicensePlates = 3;
const isValid = true;
<App>{isValid ? (
        (list.length ?? 0) >= maxLicensePlates ? (
            <AlertBase
              {...maxLicensePlatesAlert}
              hasCloseIcon={false}
            />
        ) : (
          <TextInputField
            hasClearButton={false}
            label="Naam"
            name="visitor_name"
            rules={{required: 'Vul een naam in'}}
          />
        )
      ) : null}</App>`,
      errors: [{messageId: 'preferCoercedAnd'}],
      output: `const list = [1, 2, 3];
const maxLicensePlates = 3;
const isValid = true;
<App>{!!isValid && ((list.length ?? 0) >= maxLicensePlates ? (
            <AlertBase
              {...maxLicensePlatesAlert}
              hasCloseIcon={false}
            />
        ) : (
          <TextInputField
            hasClearButton={false}
            label="Naam"
            name="visitor_name"
            rules={{required: 'Vul een naam in'}}
          />
        ))}</App>`,
    },
  ],
})
