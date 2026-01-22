import type {LayoutOrientation} from '@/components/ui/types'

export enum ConditionEquation {
  'contains' = 'contains',
  'equal' = 'equal',
  'not_contains' = 'not_contains',
  'not_equal' = 'not_equal',
}

export enum QuestionType {
  checkbox = 'checkbox',
  date = 'date',
  email = 'email',
  numeric = 'numeric',
  radio = 'radio',
  rating = 'rating',
  selection_buttons = 'selection_buttons',
  tel = 'tel',
  text = 'text',
  textarea = 'textarea',
  time = 'time',
  url = 'url',
}

export enum ConditionType {
  'and' = 'and',
  'or' = 'or',
}

export type Condition = {
  reference_question: number
  type: ConditionEquation
  value: string
}

export type Choice = {
  label: string
  show_textfield: boolean
  text: string
}

export type Question = {
  choices?: Choice[]
  conditions: Condition[]
  conditions_type?: ConditionType
  description?: string | null
  id: number
  max_characters?: number
  min_characters?: number
  orientation?: LayoutOrientation
  question_text: string
  question_type: QuestionType
  required: boolean
  sort_order?: number | null
  textarea_rows?: number | null
}
export type SurveyVersion = {
  active_from: string
  created_at: string
  questions: Question[]
  version: number
}

export type Survey = {
  description: string
  latest_version: SurveyVersion | null
  team: string
  title: string
  unique_code: string
}

export type SurveyConfig = {
  cooldown: number
  fraction: number
  location: string
  minimum_actions: number
}
export type SurveyConfigByLocationResponse = {
  id: number
  survey: Survey
} & SurveyConfig

export type Answer = {
  answer: string
  question: number
}

export type SurveyVersionEntryRequest = {
  answers: Answer[]
  entry_point: string
  metadata?: string
}

export type SurveyVersionEntryParams = SurveyVersionEntryRequest & {
  unique_code: string
  version: number
}

export type SurveyConfigParam = {
  actionCount: number
  lastSeenAt: string
  surveyId: number
}

export type SurveyConfigParams = SurveyConfigParam[]
