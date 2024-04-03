import {
  app, dialog, BrowserWindow, MessageBoxSyncOptions, shell,
} from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    title: 'Magrit',
    icon: 'dist/assets/magrit-logo-only-CTN102zB.png',
  });

  win.maximize();
  win.show();

  // Open links in the browser, not inside the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-prevent-unload', (event) => {
    const options = {
      type: 'question',
      buttons: ['Cancel', 'Leave'],
      message: 'Leave Site?',
      detail: 'Changes that you made may not be saved.',
    } as MessageBoxSyncOptions;
    const response = dialog.showMessageBoxSync(null, options);
    if (response === 1) event.preventDefault();
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile('dist/index.html');
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
