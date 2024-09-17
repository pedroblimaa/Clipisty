// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use structs::monitor_info::MonitorInfo;

mod helpers;
mod structs;

#[tauri::command]
fn paste_text() {
    helpers::clipboard_handler::send_paste_keys();
}

#[tauri::command]
fn get_mouse_position() -> (i32, i32) {
    helpers::system_helper::get_mouse_position()
}

#[tauri::command]
fn get_monitors() -> Vec<MonitorInfo> {
    helpers::system_helper::get_monitors()
}

fn main() {
    let tray = helpers::tray_handler::create_tray();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_mouse_position,
            paste_text,
            get_monitors
        ])
        .system_tray(tray)
        .on_system_tray_event(|app, event| {
            helpers::tray_handler::handle_system_tray_event(app, event);
        })
        .run(tauri::generate_context!())
        .expect("error while building application");

    // Uncomment this to test updater and set "builder" in the current "run"
    // .run(|_app_handle, _event| match _event {
    //     tauri::RunEvent::Updater(event) => {
    //         dbg!(event);
    //     }
    //     _ => {}
    // });
}
