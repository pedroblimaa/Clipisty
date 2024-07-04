import { clipboard, globalShortcut, invoke } from '@tauri-apps/api'
import { useEffect, useRef, useState } from 'react'
import CopyItem from '../../components/copy-item/CopyItem'

function Home() {
  const [textList, setTextList] = useState<string[]>([])
  const [selectedText, setSelectedText] = useState<string>('')
  const textListRef = useRef(textList)

  useEffect(() => {
    globalShortcut.register('CmdOrCtrl+Alt+V', () => {
      clipboard.writeText(selectedText)
      invoke('paste_text')
    })

    return (): void => {
      globalShortcut.unregister('CmdOrCtrl+Alt+V')
    }
  })

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

  return (
    <>
      {textList.map((text, index) => (
        <div key={index}>
          <CopyItem
            text={text}
            onClick={() => setSelectedText(text)}></CopyItem>
        </div>
      ))}
    </>
  )
}

export default Home
