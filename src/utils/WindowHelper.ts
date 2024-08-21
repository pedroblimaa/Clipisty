import { invoke } from "@tauri-apps/api"
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window"
import { MonitorInfo } from "../models/MonitorInfo"

export default class WindowHelper {
  static async showWindowOnMousePosition() {
    const mousePosition = (await invoke('get_mouse_position')) as [number, number]
    const monitors = await invoke('get_monitors') as MonitorInfo[]

    const windowYPosition = await WindowHelper.getYPosition(monitors, mousePosition)

    appWindow.setPosition(new PhysicalPosition(mousePosition[0], windowYPosition))
    appWindow.show()
    appWindow.setFocus()
  }

  private static async getYPosition(monitors: MonitorInfo[], mousePosition: [number, number]) {
    const monitor = this.getMonitorThatMouseIsInto(monitors, mousePosition)
    const mouseY = mousePosition[1]

    if (!monitor) return mouseY

    const { height: windowHeight } = await appWindow.innerSize()
    const monitorEndY = monitor.size[1] + monitor.position[1]

    if (mouseY < monitorEndY - (windowHeight / 2)) {
      return mouseY
    }

    return mouseY - windowHeight
  }

  private static getMonitorThatMouseIsInto(monitors: MonitorInfo[], mousePosition: [number, number]) {
    const [mouseX, mouseY] = mousePosition

    return monitors.find(monitor => {
      const [monX, monY] = monitor.position
      const [width, height] = monitor.size

      const isWithinX = mouseX >= monX && mouseX <= monX + width
      const isWithinY = mouseY >= monY && mouseY <= monY + height

      return isWithinX && isWithinY
    })
  }
}