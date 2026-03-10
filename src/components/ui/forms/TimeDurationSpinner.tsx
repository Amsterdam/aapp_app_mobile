import {useEffect} from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  useAnimatedProps,
} from 'react-native-reanimated'
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg'
import {scheduleOnRN} from 'react-native-worklets'
import {Rotator} from '@/components/ui/animations/Rotator'
import {TimeDurationSpinnerDirectionArrowFigure} from '@/components/ui/forms/TimeDurationSpinnerDirectionArrowFigure'
import {useBoolean} from '@/hooks/useBoolean'

type Props = {
  initialHours?: number
  initialMinutes?: number
  maxHours?: number
  maxMinutes?: number
  minHours?: number
  minMinutes?: number
  onChange: (hours: number, minutes: number) => void
}

const {width, height} = Dimensions.get('window')
const CIRCLE_SIZE = Math.min(Math.min(height, width) * 0.7, 350)

const numberOfLines = 16

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const convertDegreesToHoursAndMinutes = (rotation: number) => {
  'worklet'
  const totalMinutes = Math.round(rotation / 6) // 360 degrees = 60 minutes
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return {hours, minutes}
}

const convertHoursAndMinutesToDegrees = (hours: number, minutes: number) => {
  'worklet'

  return hours * 360 + minutes * 6
}

const clampHoursAndMinutes = (
  desiredHours: number,
  desiredMinutes: number,
  minHours: number,
  minMinutes: number,
  maxHours: number,
  maxMinutes: number,
) => {
  'worklet'

  if (
    desiredHours < minHours ||
    (desiredHours === minHours && desiredMinutes < minMinutes)
  ) {
    return {hours: minHours, minutes: minMinutes, clamped: true}
  }

  if (
    desiredHours > maxHours ||
    (desiredHours === maxHours && desiredMinutes > maxMinutes)
  ) {
    return {hours: maxHours, minutes: maxMinutes, clamped: true}
  }

  return {hours: desiredHours, minutes: desiredMinutes, clamped: false}
}

export const TimeDurationSpinner = ({
  onChange,
  maxHours,
  maxMinutes,
  minHours = 0,
  minMinutes = 0,
  initialHours = 0,
  initialMinutes = 0,
}: Props) => {
  const rotation = useSharedValue(
    convertHoursAndMinutesToDegrees(initialHours, initialMinutes),
  )
  const {
    value: isPanActive,
    enable: enablePanActive,
    disable: disablePanActive,
  } = useBoolean(false)

  useEffect(() => {
    if (!isPanActive) {
      rotation.value = withSpring(
        convertHoursAndMinutesToDegrees(initialHours, initialMinutes),
        {
          damping: 10,
          stiffness: 90,
          overshootClamping: true,
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHours, initialMinutes, rotation])
  const startAngle = useSharedValue(0)
  const velocity = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onStart(event => {
      const centerX = CIRCLE_SIZE / 2
      const centerY = CIRCLE_SIZE / 2
      const dx = event.x - centerX
      const dy = event.y - centerY

      startAngle.value = Math.atan2(dy, dx)
      scheduleOnRN(enablePanActive)
    })
    .onUpdate(event => {
      const centerX = CIRCLE_SIZE / 2
      const centerY = CIRCLE_SIZE / 2
      const dx = event.x - centerX
      const dy = event.y - centerY
      const currentAngle = Math.atan2(dy, dx)
      const deltaAngle = currentAngle - startAngle.value

      const deltaDegrees = (deltaAngle * 180) / Math.PI // Convert radians to degrees

      const {hours: desiredHours, minutes: desiredMinutes} =
        convertDegreesToHoursAndMinutes(rotation.value + deltaDegrees)

      const {hours, minutes, clamped} = clampHoursAndMinutes(
        desiredHours,
        desiredMinutes,
        minHours,
        minMinutes,
        maxHours ?? Infinity,
        maxMinutes ?? Infinity,
      )

      if (clamped) {
        rotation.value = convertHoursAndMinutesToDegrees(hours, minutes)
      } else {
        rotation.value += deltaDegrees // Update rotation value
      }

      velocity.value = deltaDegrees // Calculate velocity

      scheduleOnRN(onChange, hours, minutes)
    })
    .onEnd(() => {
      if (velocity.value > 1) {
        rotation.value = withSpring(rotation.value + velocity.value * 5, {
          damping: 10,
          stiffness: 90,
          overshootClamping: true,
        }) // Apply inertia to rotation
      }

      const {hours: desiredHours, minutes: desiredMinutes} =
        convertDegreesToHoursAndMinutes(rotation.value)

      const {hours, minutes} = clampHoursAndMinutes(
        desiredHours,
        desiredMinutes,
        minHours,
        minMinutes,
        maxHours ?? Infinity,
        maxMinutes ?? Infinity,
      )

      rotation.value = convertHoursAndMinutesToDegrees(hours, minutes)
      scheduleOnRN(onChange, hours, minutes)
      scheduleOnRN(disablePanActive)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }))
  const borderProgress = useDerivedValue(() =>
    rotation.value >= 360
      ? 0
      : Math.PI * CIRCLE_SIZE * (-1 + (rotation.value % 360) / 360),
  )

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: borderProgress.value,
  }))
  const borderRotationProgress = useDerivedValue(() => rotation.value - 90)

  const borderAnimatedProps = useAnimatedProps(() => ({
    transform: [{rotate: `${borderRotationProgress.value}deg`}], // Rotate the progress bar to start from the top
  }))

  return (
    <View style={styles.container}>
      <AnimatedSvg
        animatedProps={borderAnimatedProps}
        height={CIRCLE_SIZE + 20}
        style={styles.progressBar}
        testID="TimeDurationSpinner"
        width={CIRCLE_SIZE + 20}>
        {/* Gradient Definition */}
        <Defs>
          <LinearGradient
            gradientUnits="userSpaceOnUse"
            id="gradient"
            x1="100%"
            x2="0%"
            y1="50%"
            y2="50%">
            <Stop
              offset="0%"
              stopColor="#000000"
              stopOpacity="1"
            />
            <Stop
              offset="10%"
              stopColor="#004699"
              stopOpacity="1"
            />
            <Stop
              offset="100%"
              stopColor="#009DE6"
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Circle
          cx={(CIRCLE_SIZE + 20) / 2}
          cy={(CIRCLE_SIZE + 20) / 2}
          fill="none"
          r={CIRCLE_SIZE / 2}
          stroke="#ddd"
          strokeWidth={10}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={(CIRCLE_SIZE + 20) / 2}
          cy={(CIRCLE_SIZE + 20) / 2}
          fill="none"
          r={CIRCLE_SIZE / 2}
          stroke="url(#gradient)" // Apply the gradient along the border
          strokeDasharray={`${Math.PI * CIRCLE_SIZE}`}
          strokeLinecap="round"
          strokeWidth={10}
        />
      </AnimatedSvg>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.circle, animatedStyle]}>
          {/* Render the lines */}
          {Array.from({length: numberOfLines}).map((_, index) => {
            const angle = (360 / numberOfLines) * index // Calculate angle for each line

            return (
              <View
                key={index}
                style={[
                  styles.line,
                  {
                    transform: [
                      {rotate: `${angle}deg`},
                      {translateY: -CIRCLE_SIZE / 2 + 40}, // Position line near the border
                    ],
                  },
                ]}
                testID={`TimeDurationSpinnerLine${index}`}
              />
            )
          })}
          {initialHours === 0 && initialMinutes === 0 && (
            <Rotator duration={5000}>
              <TimeDurationSpinnerDirectionArrowFigure />
            </Rotator>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: CIRCLE_SIZE + 20,
    width: CIRCLE_SIZE + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    // backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
  },
  line: {
    position: 'absolute',
    width: 2,
    height: 20, // Length of the line
    backgroundColor: '#000',
  },
})
