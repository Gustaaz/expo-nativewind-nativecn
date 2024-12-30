import { useState } from "react"

export function useVisible() {
  const [isVisible, setisVisible] = useState(false)

  const handleToggle = () => {
    setisVisible(!isVisible)
  }
  return {
    isVisible,
    handleToggle
  }
}
