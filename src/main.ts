import { app, BrowserWindow, ipcMain, IpcMessageEvent } from "electron";
import * as storage from "electron-json-storage";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 1600,
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file",
    slashes: true,
  }));
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("requestLoadReceiptCache", (event: IpcMessageEvent, args: {}) => {
  storage.get("cache", (error: Error, data: object) => {
    const response = error ? error.message : data;
    event.sender.send("responseLoadReceiptCache", response);
  });
});

ipcMain.on("requestSaveReceiptCache", (event: IpcMessageEvent, args: object) => {
  storage.set("config", args, (error: Error) => {
    const response = error ? error.message : { saved: true };
    event.sender.send("responseSaveReceiptCache", response);
  })
});