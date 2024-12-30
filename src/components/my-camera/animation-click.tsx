import { MotiView } from 'moti'
import { Focus } from '@/types/focus'

interface AnimationClickProps {
  focus: Focus
}

export function AnimationClick({ focus }: AnimationClickProps) {
  return (
    <>
      {focus.isActive && focus.x && (
        <MotiView
          style={{
            position: 'absolute',
            zIndex: 100,
            left: focus.x,
            top: focus.y,
            width: 50,
            height: 50,
            borderRadius: 999,
            borderWidth: 4,
            borderColor: 'white'
          }}
          from={{
            opacity: 0,
            scale: 2.0
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.5
          }}
        />
      )}
    </>
  )
}
