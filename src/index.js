import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'bootstrap/dist/css/bootstrap.min.css';
import SplashScreen from "./SplashScreen";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import NetworkService from "./utils/interceptors"
import { createRoot } from 'react-dom/client';

let persistor = persistStore(store);
NetworkService.setupInterceptors(store);

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={<SplashScreen />} persistor={persistor}>
//       <div className="">
//         <App />
//       </div>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );


const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
       <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <div className="">
          <App />
        </div>
     </PersistGate>
   </Provider>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
