'use strict';
// Para las react-dev-tools y redux-dev-tools
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

// Import parts of electron to use
const {
  app, 
  ipcMain,
  BrowserWindow,
  Notification
} = require('electron');
const path = require('path')
const url = require('url')

// De utils sacamos las constantes que van a recoger las variables mandadas desde el front
const {
  CATCH_ON_MAIN,
  MANDAR_AL_RENDERER_REACT
} = require('./utils/constants');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, height: 768, show: false
  });

  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:4000',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL( indexPath );

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if ( dev ) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Para instalar los react dev-tools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => {
      console.log(`Agregada extension: ${name}`);
    }).catch((error) => {
      console.log("Un error ocurrio cuando se instalaban las React Developer Tools", error);
    });
  installExtension(REDUX_DEVTOOLS)
    .then((name) => {
      console.log(`Agregada extension: ${name}`);
    }).catch((error) => {
      console.log("Un error ocurrio cuando se instalaban las Redux Developer Tools", error);
    });  
  // Terminan las DevTools
}

// Para darle un ID a la App
app.setAppUserModelId("com.dev.name");

// Recuperamos la variable mandada desde el front para desplegarla/usuarla en la consola o propiedades de
// ventana de la app
ipcMain.on(CATCH_ON_MAIN, (event, arg) => {
  console.log('Un mensaje en el main: ', arg);
  // Ahora mandamos un mensaje del main al rederer
  mainWindow.send(MANDAR_AL_RENDERER_REACT, 'Holi soy un mensajito de main XD');
  // Una nueva notificacion, la mandamos al render
  let notificacion = new Notification("it", {body: 'works!'}).show();

  console.log("El objeto de notificacion es:", notificacion)

  // notificacion.onClick = () => {
  //   console.log('Hiciste click en la notificacion');
  // };

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
