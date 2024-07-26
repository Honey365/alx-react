import React from "react";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
      <React.Fragment>
          <div className='root-notifications'>
              <Notifications />
          </div>
          <div className="App">
              <Header />
              <div className="App-body">
                  <Login />
              </div>
              <div className='App-footer'>
                  <Footer />
              </div>
          </div>
      </React.Fragment>
  );
}

export default App;
