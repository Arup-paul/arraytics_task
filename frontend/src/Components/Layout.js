import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import AuthUser from "./AuthUser";
import Home from "../pages/Home";
import AddressBook from "../pages/AddressBook";
import AddressBookCreate from "../pages/AddressBook/create";
import AddressBookEdit from "../pages/AddressBook/edit";

const Layout = () => {
    const {token,logout} = AuthUser();


    const handleLogout = () => {
         window.confirm("Are you sure you want to logout?")
             if(token !== undefined){
                    logout();
             }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg d-flex justify-content-center navbar-dark">
                <div className="container">

                    <div className="collapse navbar-collapse navbar-nav-center" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to='/' className="nav-link" >Home</Link>
                            </li>

                            <li className="nav-item active">
                                <Link to='/address-book' className="nav-link"  >Address Book</Link>
                            </li>


                            <li className="nav-item active">
                                <span className="nav-link" onClick={handleLogout}>Logout</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/address-book" element={<AddressBook />} />
                <Route path="/address-book/create" element={<AddressBookCreate />} />
                <Route path="/address-book/edit/:id" element={<AddressBookEdit />} />
            </Routes>
        </div>
    );
};

export default Layout;