import { clipboard } from "@tauri-apps/api"
import { TextItem } from "../models/TextItem"

export default class AppHelper {

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