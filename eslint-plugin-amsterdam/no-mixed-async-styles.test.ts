import {rule} from './no-mixed-async-styles.mts'
import {ruleTester} from './utils/ruleTester'

ruleTester.run('no-mixed-async-styles', rule, {
  valid: [
    {
      code: `async function loadData() {
  await fetchData()
  await saveData()
}`,
    },
    {
      code: `function loadData() {
  return fetchData()
    .then(data => saveData(data))
    .catch(error => reportError(error))
}`,
    },
    {
      code: `function waitForValue() {
  return new Promise(resolve => {
    resolve('done')
  })
}`,
    },
    {
      code: `async function waitForValue() {
  await new Promise(resolve => {
    resolve('done')
  })
}`,
    },
    {
      code: `async function loadData() {
  await fetchData()

  function loadNestedData() {
    return fetchOtherData().then(data => saveData(data))
  }

  return loadNestedData()
}`,
    },
  ],
  invalid: [
    {
      code: `async function loadData() {
  await fetchData()
  return fetchOtherData().then(data => saveData(data))
}`,
      errors: [
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'async/await',
            otherStyles: 'promise chaining',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'promise chaining',
            otherStyles: 'async/await',
          },
        },
      ],
    },
    {
      code: `async function loadData() {
  const data = await fetchData()
  return new Promise(resolve => {
    resolve(data)
  })
}`,
      errors: [
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'async/await',
            otherStyles: 'Promise constructor',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'Promise constructor',
            otherStyles: 'async/await',
          },
        },
      ],
    },
    {
      code: `function loadData() {
  const request = new Promise(resolve => {
    resolve('done')
  })

  return request.then(data => saveData(data))
}`,
      errors: [
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'Promise constructor',
            otherStyles: 'promise chaining',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'promise chaining',
            otherStyles: 'Promise constructor',
          },
        },
      ],
    },
    {
      code: `async function loadData() {
  const request = new Promise(resolve => {
    resolve(fetchData())
  })

  await request
  return request.then(data => saveData(data)).catch(error => reportError(error))
}`,
      errors: [
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'Promise constructor',
            otherStyles: 'async/await and promise chaining',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'async/await',
            otherStyles: 'Promise constructor and promise chaining',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'promise chaining',
            otherStyles: 'async/await and Promise constructor',
          },
        },
        {
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: 'promise chaining',
            otherStyles: 'async/await and Promise constructor',
          },
        },
      ],
    },
  ],
})
