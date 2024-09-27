export TAURI_PRIVATE_KEY="$(cat $HOME/.tauri/clipisty.key)"
export TAURI_KEY_PASSWORD="$(cat ./tauri-private-key.txt)"

npm run tauri build -- --config src-tauri/tauri.prod.conf.json