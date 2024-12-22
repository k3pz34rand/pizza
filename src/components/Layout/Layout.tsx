import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function Layout() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
