import { clipboard, globalShortcut } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useRef, useState } from 'react'

import CopyItem from '../../components/copy-item/CopyItem'
import { TextItem } from '../../models/textItem'
import AppHelper from '../../utils/appHelper'
import './Home.css'

function Home() {
  const [textList, setTextList] = useState<TextItem[]>([])
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
    }, 100)

    return (): void => clearInterval(interval)
  }, [])

  const handleClipboardText = async (): Promise<void> => {
    const newList = await AppHelper.createNewTextList(textListRef.current)
    setTextList(newList)
  }

  const setToClipboard = (text: string) => {
    clipboard.writeText(text)
    appWindow.hide()
  }

  return (
    <div className='btns-container'>
      {textList.map(textItem => (
        <CopyItem
          text={textItem.text}
          onClick={() => setToClipboard(textItem.text)}
          key={textItem.date}></CopyItem>
      ))}
    </div>
  )
}

export default Home
