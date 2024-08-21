import { clipboard, invoke } from "@tauri-apps/api"
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window"
import { MonitorInfo } from "../models/MonitorInfo"
import { TextItem } from "../models/TextItem"

export default class AppHelper {
  static async showWindowOnMousePosition() {
    const mousePosition = (await invoke('get_mouse_position')) as [number, number]

    const monitors = await invoke('get_monitors') as MonitorInfo[]
    const monitor = this.getMonitorThatMouseIsInto(monitors, mousePosition)

    const windowYPosition = await this.getYPosition(monitor, mousePosition)

    appWindow.setPosition(new PhysicalPosition(mousePosition[0], windowYPosition))
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

  static getMonitorThatMouseIsInto(monitors: MonitorInfo[], mousePosition: [number, number]) {
    return monitors.find(monitor => {
      const startXPos = monitor.position[0]
      const endXPos = monitor.position[0] + monitor.size[0]

      const startYPos = monitor.position[1]
      const endYPos = monitor.position[1] + monitor.size[1]

      const mouseIsInto = mousePosition[0] < endXPos &&
        mousePosition[0] > startXPos &&
        mousePosition[1] < endYPos &&
        mousePosition[1] > startYPos

      return mouseIsInto
    })
  }

  static async getYPosition(monitor: MonitorInfo | undefined, mousePosition: [number, number]) {
    if (!monitor) {
      return 1080
    }

    const windowSize = await appWindow.innerSize()
    const monitorEndPos = (monitor.size[1] + monitor.position[1]) || 1080

    const windowYPosition = (monitorEndPos - mousePosition[1]) < windowSize.height
      ? mousePosition[1] - windowSize.height
      : mousePosition[1]

    return windowYPosition
  }
}