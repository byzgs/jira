import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { TsReactTest } from 'homework/try-use-array';
import { LoginScreen } from 'screens/login';

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <LoginScreen />
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
