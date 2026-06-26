import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const prevTextRef = useRef('')

  useEffect(() => {
    if (text === prevTextRef.current) return

    prevTextRef.current = text
    indexRef.current = 0
    setDisplayed('')
    setIsTyping(true)

    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current <= text.length) {
        setDisplayed(text.slice(0, indexRef.current))
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  const skip = () => {
    setDisplayed(text)
    setIsTyping(false)
    indexRef.current = text.length
  }

  return { displayed, isTyping, skip }
}
