import {useEffect, useMemo, useRef, useState} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  grow?: boolean
} & TestProps &
  Or<
    {
      /**
       * Add a timestamp to start a timer which shows textual loading timeout feedback.
       */
      startedTimeStamp?: number
    },
    {
      /**
       * Starts a timer from time of mount (as ref) and show textual loading timeout feedback.
       */
      showFeedback?: true
    }
  >

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

export const PleaseWait = ({
  grow,
  startedTimeStamp,
  showFeedback,
  testID,
}: Props) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTimeRef = useRef<number | null>(showFeedback ? Date.now() : null)
  useEffect(() => {
    const countFrom = startedTimeStamp || startTimeRef.current

    if (!countFrom) {
      return
    }

    const interval = setInterval(() => {
      setElapsedTime(Math.abs(dayjs(countFrom).diff()))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [startedTimeStamp, startTimeRef])

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
          {!!feedback && (
            <Phrase
              testID="PleaseWaitFeedbackPhrase"
              textAlign="center">
              {feedback}
            </Phrase>
          )}
        </Column>
      </Box>
    </Center>
  )
}
