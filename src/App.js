import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './App.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Lender from "./Lender.js";
import Invoice from "./Invoice.js";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
        <Sidebar>
        <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link to="/" />}> Home</MenuItem>
        <MenuItem component={<Link to="/home/invoice" />}> Invoice</MenuItem>
        <MenuItem component={<Link to="/home/lender" />}> Lender</MenuItem>
      </Menu>
      </Sidebar>

      <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/home/invoice" element={<Invoice />}>
          </Route>
          <Route path="/home/lender" element={<Lender />}>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
