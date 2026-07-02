import {use} from 'react'
import {SearchFieldContext} from '@/providers/searchField.context'

export const useSearchField = () => use(SearchFieldContext)
