import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
   
export default function Header() {

    return (
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
              <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                  Sidebar
                </Typography>
              </div>
              <List>
                <ListItem>
                  <ListItemPrefix>
                    {/* <PresentationChartBarIcon className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    {/* <ShoppingBagIcon className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  <NavLink to="/services" activeClassName="active">Services</NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    {/* <InboxIcon className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                  {/* <ListItemSuffix>
                    <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                  </ListItemSuffix> */}
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    {/* <UserCircleIcon className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  <NavLink to="/about" activeClassName="active">About</NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    {/* <Cog6ToothIcon className="h-5 w-5" /> */}
                  </ListItemPrefix>
                  <NavLink to="/booknow"  activeClassName="active">Book Now</NavLink>
                </ListItem>
              </List>
            </Card>
          );
}
