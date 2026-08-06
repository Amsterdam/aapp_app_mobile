import {useEffect, useMemo, useState} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  grow?: boolean
  /**
   * Add a startedTimeStamp (e.g. Date.now()) to get textual loading timeout feedback.
   */
  startedTimeStamp?: number
} & TestProps

const FIRST_TIMEOUT_VALUE = 5
const SECOND_TIMEOUT_VALUE = 15

const getElapsedTimeFeedback = (elapsedTime: number) => {
  if (
    elapsedTime >= FIRST_TIMEOUT_VALUE &&
    elapsedTime < SECOND_TIMEOUT_VALUE
  ) {
    return 'Gegevens worden geladen'
  } else if (elapsedTime >= SECOND_TIMEOUT_VALUE) {
    return 'Dit duurt langer dan normaal. \n We zijn nog bezig.'
  }
}

export const PleaseWait = ({grow, startedTimeStamp, testID}: Props) => {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!startedTimeStamp) {
      return
    }

    const interval = setInterval(() => {
      setElapsedTime(Math.abs(dayjs(startedTimeStamp).diff()))
    }, 1000)

    return () => {
      clearInterval(interval)
      setElapsedTime(0)
    }
  }, [startedTimeStamp])

  const elapsedSeconds = Math.floor(elapsedTime / 1000)

  const feedback = useMemo(
    () => getElapsedTimeFeedback(elapsedSeconds),
    [elapsedSeconds],
  )

  return (
    <Center grow={grow}>
      <Box>
        <Column gutter="md">
          <Icon
            color="link"
            name="spinner"
            size="lg"
            testID={testID}
          />
          {!!feedback && <Phrase textAlign="center">{feedback}</Phrase>}
        </Column>
      </Box>
    </Center>
  )
}
