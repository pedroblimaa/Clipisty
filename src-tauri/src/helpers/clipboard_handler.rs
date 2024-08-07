use rdev::{simulate, EventType, Key};

pub fn send_paste_keys() {
    simulate_keypress(Key::ControlLeft, true);
    simulate_keypress(Key::KeyV, true);
    simulate_keypress(Key::KeyV, false);
    simulate_keypress(Key::ControlLeft, false);
}

fn simulate_keypress(key: Key, press: bool) {
    let event_type = if press {
        EventType::KeyPress(key)
    } else {
        EventType::KeyRelease(key)
    };

    simulate(&event_type).unwrap();
}
