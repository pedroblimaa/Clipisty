use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

pub fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => println!("system tray received a left click"),
        SystemTrayEvent::RightClick { .. } => println!("system tray received a right click"),
        SystemTrayEvent::DoubleClick { .. } => println!("system tray received a double click"),
        SystemTrayEvent::MenuItemClick { id, .. } => handle_menu_item_click(app, id),
        _ => {}
    }
}

pub fn create_tray() -> SystemTray {
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");

    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

fn handle_menu_item_click(app: &AppHandle, id: String) {
    match id.as_str() {
        "quit" => std::process::exit(0),
        "hide" => app.get_window("main").unwrap().hide().unwrap(),
        "show" => app.get_window("main").unwrap().show().unwrap(),
        _ => {}
    }
}
