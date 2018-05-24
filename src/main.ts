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

ipcMain.on("requestSettings", (event: IpcMessageEvent, args: {}) => {
  storage.get("config", (error: Error, data: object) => {
    if (error) {
      event.sender.send("responseSettings", error.message);
    } else {
      event.sender.send("responseSettings", data);
    }
  });
});

ipcMain.on("requestSaveSettings", (event: IpcMessageEvent, args: object) => {
  storage.set("config", args, (error: Error) => {
    if (error) {
      event.sender.send("responseSaveSettings", error.message);
    } else {
      event.sender.send("responseSaveSettings", { saved: true } );
    }
  })
});