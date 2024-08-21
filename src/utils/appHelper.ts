import { clipboard, invoke } from "@tauri-apps/api"
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window"
import { TextItem } from "../models/textItem"

const WINDOW_HEIGHT = 600

interface MonitorInfo {
  position: { x: number, y: number },
  size: { width: number, height: number }
}

export default class AppHelper {
  static async showWindowOnMousePosition() {
    const position = (await invoke('get_mouse_position')) as [number, number]
    const monitors = await invoke('get_monitors') as MonitorInfo
    console.log(monitors)

    const windowYPosition = position[1] < WINDOW_HEIGHT ? WINDOW_HEIGHT : position[1]

    console.log(windowYPosition)

    appWindow.setPosition(new PhysicalPosition(position[0], windowYPosition))
    appWindow.show()
    appWindow.setFocus()
  }

  static async createNewTextList(textList: TextItem[]): Promise<TextItem[]> {
    const text = await clipboard.readText()
    const textExist = textList.some(item => item.text === text)

    if (textExist || !text) {
      return textList
    }

    const newTextList = [...textList, { text, date: Date.now() }]
    const sortedTextList = newTextList.sort((a, b) => b.date - a.date)

    return sortedTextList.slice(0, 8)
  }
}