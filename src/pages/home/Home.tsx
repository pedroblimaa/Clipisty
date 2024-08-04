import { clipboard } from '@tauri-apps/api'
import { useEffect, useRef, useState } from 'react'
import CopyItem from '../../components/copy-item/CopyItem'

function Home() {
  const [textList, setTextList] = useState<string[]>([])
  const textListRef = useRef(textList)

  useEffect(() => {
    textListRef.current = textList
  }, [textList])

  useEffect(() => {
    const interval = setInterval(() => {
      handleClipboardText()
    }, 1000)

    return (): void => clearInterval(interval)
  }, [])

  const handleClipboardText = async (): Promise<void> => {
    const text = await clipboard.readText()
    const textExist = textListRef.current.some(item => item === text)

    if (!textExist && text) {
      setTextList([...textListRef.current, text])
    }
    console.log(textListRef.current)
  }

  const setToClipboard = (text: string) => {
    clipboard.writeText(text)
  }

  return (
    <>
      {textList.map((text, index) => (
        <div key={index}>
          <CopyItem text={text} onClick={() => setToClipboard(text)}></CopyItem>
        </div>
      ))}
    </>
  )
}

export default Home
