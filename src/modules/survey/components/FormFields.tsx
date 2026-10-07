import {SurveyFormField} from '@/modules/survey/components/SurveyFormField'
import type {Question} from '@/modules/survey/types'

type Props = {
  questions?: Question[]
}

export const FormFields = ({questions}: Props) =>
  questions
    ? questions.map((question, index) => (
        <SurveyFormField
          index={index}
          key={question.id}
          question={question}
        />
      ))
    : null
