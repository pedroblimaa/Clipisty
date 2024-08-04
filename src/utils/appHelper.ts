import { invoke } from "@tauri-apps/api"
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window"

export default class AppHelper {
  static async showWindowOnMousePosition() {
    const position = (await invoke('get_mouse_position')) as [number, number]
    appWindow.setPosition(new PhysicalPosition(position[0], position[1]))
    appWindow.show()
  }
}