import {print} from './print.mts'
import type {Interface} from 'node:readline/promises'

export const requireAnswer = async (question: string, rl: Interface) => {
  let answer: string | undefined

  while (answer === undefined) {
    const userInput = await rl.question(question)

    if (!userInput.trim()) {
      print('This field cannot be empty. Please provide a valid answer.', 'red')
      continue
    }

    answer = userInput.trim()
  }

  return answer
}
