export const stripHtmlTags = (text: string) => {
  let strippedText = ''
  let pendingTag = ''
  let isInsideTag = false

  for (const character of text) {
    if (isInsideTag) {
      pendingTag += character

      if (character === '>') {
        isInsideTag = false
        pendingTag = ''
      }

      continue
    }

    if (character === '<') {
      isInsideTag = true
      pendingTag = character
      continue
    }

    strippedText += character
  }

  return isInsideTag ? strippedText + pendingTag : strippedText
}
