import { clipboard, globalShortcut } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useRef, useState } from 'react'
import CopyItem from '../../components/copy-item/CopyItem'
import AppHelper from '../../utils/appHelper'
import './Home.css'

function Home() {
  const [textList, setTextList] = useState<string[]>([])
  const textListRef = useRef(textList)

  useEffect(() => {
    globalShortcut.register('CmdOrCtrl+Alt+V', async () => {
      AppHelper.showWindowOnMousePosition()
    })

    return () => {
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
  }

  const setToClipboard = (text: string) => {
    clipboard.writeText(text)
    appWindow.hide()
  }

  return (
    <div className='btns-container'>
      {textList.map((text, index) => (
          <CopyItem text={text} onClick={() => setToClipboard(text)} key={index}></CopyItem>
      ))}
    </div>
  )
}

export default Home
