use std::sync::Once;

use mouse_position::mouse_position::Mouse;
use serde::Serialize;
use winit::{event_loop::EventLoop, monitor::MonitorHandle};

static INIT: Once = Once::new();
static mut EVENT_LOOP: Option<EventLoop<()>> = None;

#[derive(Debug, Serialize)]
pub struct MonitorInfo {
    position: (i32, i32),
    size: (u32, u32),
}

pub fn get_mouse_position() -> (i32, i32) {
    match Mouse::get_mouse_position() {
        Mouse::Position { x, y } => (x, y),
        Mouse::Error => (0, 0),
    }
}

pub fn get_monitors() -> Vec<MonitorInfo> {
    let event_loop = get_event_loop();

    let monitors = event_loop
        .available_monitors()
        .map(|monitor: MonitorHandle| MonitorInfo {
            position: (monitor.position().x, monitor.position().y),
            size: (monitor.size().width, monitor.size().height),
        })
        .collect();

    monitors
}

fn get_event_loop() -> &'static EventLoop<()> {
    unsafe {
        INIT.call_once(|| {
            EVENT_LOOP = Some(EventLoop::new());
        });
        EVENT_LOOP.as_ref().unwrap()
    }
}
