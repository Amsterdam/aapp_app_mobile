import {type ReactNode, useEffect, useState} from 'react'
import {initialValue, SearchFieldContext} from '@/providers/searchField.context'

type Props = {
  amount?: number
  children: ReactNode
  type?: string
}

export const SearchFieldProvider = ({children, amount, type}: Props) => {
  const [searchFieldValue, setSearchFieldValue] = useState('')
  const [providerValue, setProviderValue] = useState(initialValue)

  useEffect(() => {
    setProviderValue({
      amount: amount ?? 0,
      type: type ?? '',
      value: searchFieldValue,
      setSearchFieldValue: setSearchFieldValue,
    })
  }, [amount, searchFieldValue, setProviderValue, type])

  return (
    <SearchFieldContext value={providerValue}>{children}</SearchFieldContext>
  )
}
