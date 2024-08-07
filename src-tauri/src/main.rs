// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod helpers;

#[tauri::command]
fn paste_text() {
    helpers::clipboard_handler::send_paste_keys();
}

#[tauri::command]
fn get_mouse_position() -> (i32, i32) {
    helpers::system_helper::get_mouse_position()
}

fn main() {
    let tray = helpers::tray_handler::create_tray();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_mouse_position, paste_text])
        .system_tray(tray)
        .on_system_tray_event(|app, event| {
            helpers::tray_handler::handle_system_tray_event(app, event);
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
