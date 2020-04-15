import React, { Component } from 'react';
// import SquareDashboard from "./views/Dashboard/SquareDashboard";
import TeslaDashboard from "./views/Dashboard/TeslaDashboard";
import 'chartjs-plugin-annotation';

class App extends Component {
  render() {
    return (
      <TeslaDashboard />
    );
  }
}

export default App;
