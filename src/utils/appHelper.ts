import { clipboard, invoke } from "@tauri-apps/api"
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window"
import { TextItem } from "../models/textItem"

export default class AppHelper {
  static async showWindowOnMousePosition() {
    const position = (await invoke('get_mouse_position')) as [number, number]
    appWindow.setPosition(new PhysicalPosition(position[0], position[1]))
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