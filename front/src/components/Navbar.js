import { useState } from 'react';
import {
   Navbar,
   Nav,
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   NavbarBrand,
   NavbarText,
   NavbarToggler,
   Collapse,
   NavItem,
   UncontrolledDropdown,
   NavLink,
   Modal,
   Button,
   ModalBody,
   ModalHeader,
} from 'reactstrap';
import Login from './Login.js';
// import { NavLink } from 'react-router-dom';

export default function Navi() {
   const [isOpen, toggleOpen] = useState(false);
   const [loginModal, setLoginModal] = useState(false);
   function getUserData() {
      return JSON.parse(localStorage.getItem('user'));
   }
   function hasJWT() {
      let flag = false;

      //check user has JWT token
      localStorage.getItem('token') ? (flag = true) : (flag = false);
      console.log(localStorage.getItem('token'));

      return flag;
   }

   const toggleLoginModal = () => setLoginModal(!loginModal);
   return (
      <Navbar
         className="p-1"
         expand="sm"
         color="dark"
         dark
         container="sm"
         style={{
            zIndex: 100,
         }}
      >
         <NavbarBrand className="display-4" href="/">
            MD-Portal
         </NavbarBrand>
         <NavbarToggler onClick={() => toggleOpen(!isOpen)}>
            <div
               style={{
                  background: "url('/assets/burger-icon.png')",
                  backgroundSize: 'contain',
                  height: '20px',
                  width: '20px',
               }}
            ></div>
         </NavbarToggler>
         <Collapse className="lead" isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
               <NavItem>
                  <NavLink href="/announcements">Announcements</NavLink>
               </NavItem>
               <NavItem>
                  <NavLink href="/staffs">Staffs</NavLink>
               </NavItem>
               <NavItem>
                  <NavLink href="/gallery">Gallery</NavLink>
               </NavItem>
               <NavItem>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                        Grade Level
                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 7"
                           >
                              Grade 7
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 8"
                           >
                              Grade 8
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 9"
                           >
                              Grade 9
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 10"
                           >
                              Grade 10
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 11"
                           >
                              Grade 11
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=Grade 12"
                           >
                              Grade 12
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=TECHVOC"
                           >
                              TECHVOC
                           </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                           <NavLink
                              className="text-dark py-0"
                              href="/announcements?tags=STE"
                           >
                              STE
                           </NavLink>
                        </DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </NavItem>
               <NavItem>
                  {hasJWT() ? (
                     <NavLink href="admin">{getUserData()?.firstName}</NavLink>
                  ) : (
                     <NavLink>
                        <Button onClick={toggleLoginModal}>Login</Button>
                     </NavLink>
                  )}
               </NavItem>
            </Nav>
         </Collapse>
         <Modal isOpen={loginModal} toggle={toggleLoginModal}>
            <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
            <Login />
         </Modal>
      </Navbar>
   );
}
