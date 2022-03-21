import React from 'react';
import { useAuth } from 'context/auth.context';
import './App.less';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
// import { ProjectListScreen } from 'screens/project-list';
// import { TsReactTest } from 'homework/try-use-array';

function App() {
  // 通过useAuth() 判断是否已经登录，从而决定渲染登陆界面 还是内容界面
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
