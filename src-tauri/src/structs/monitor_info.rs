use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct MonitorInfo {
    pub position: (i32, i32),
    pub size: (u32, u32),
}
