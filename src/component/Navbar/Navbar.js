import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "./Navbar.css";
import React, { useState } from "react";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BsFillCartFill } from "react-icons/bs";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { useSubscription } from "@apollo/client";
import { BadgeCart } from "../../config/graphql/subscription/subscription";

function Example(args) {
  const { data, loading, error } = useSubscription(BadgeCart);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ boxShadow: "2px 4px 5px 0px rgba(0,0,0,0.22)" }}>
      <Navbar expand="sm" sticky="top" {...args}>
        {/* <NavbarBrand href="/"><BsFillCartFill style={{marginRight:'5px'}}/>Title</NavbarBrand> */}
        <NavbarBrand href="/">
          <span style={{ fontWeight: "bold", color: "#1088E9" }}>K</span>umikyu
        </NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/store">
              <span style={{ color: "#1088E9", fontSize: "18px" }}>Store</span>
            </NavLink>
          </NavItem>
        </Nav>
        {/* <NavbarText className="items">
            <FaUserCircle style={{ marginRight: "5px" }} />
            user
          </NavbarText> */}
        <div>
          <NavLink href="/cart">
            <Badge count={data?.toko_order_aggregate.aggregate.sum.jumlah}>
              <BsFillCartFill
                style={{ paddingRight: "5px" }}
                className="items"
              />
            </Badge>
          </NavLink>
        </div>
        <div style={{ paddingLeft: "5px" }}>
          <Avatar
            style={{ backgroundColor: "#1088E9" }}
            size="small"
            icon={<UserOutlined />}
          />
        </div>
      </Navbar>
    </div>
  );
}
// let sum = arr.reduce((acc, val) => {
//   return acc + val;
// });
export default Example;
