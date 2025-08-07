import React from "react";
import { Input, Dropdown, Menu, Button } from "antd";
import { BellOutlined, DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Divider } from "antd";

import Search from "./Search.jsx";

const languageMenu = (
  <Menu>
    <Menu.Item key="en">English</Menu.Item>
    <Menu.Item key="es">Spanish</Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <header className="flex justify-between items-center pb-4 px-4">
      <Search />
      <h1 className="text-3xl font-bold text-gray-800"></h1>
      <div className="flex items-center space-x-4 gap-3">
        <Divider type="vertical" style={{ height: 30 }}></Divider>
        <Badge
          count={12}
          style={{
            padding: 0,
            color: "white",
            background: "var(--color-blue-500)",
          }}
        >
          <BellOutlined className="text-xl text-gray-500 " />
        </Badge>
        <Divider type="vertical" style={{ height: 30 }}></Divider>
        <Dropdown overlay={languageMenu} trigger={["click"]}>
          <span className="flex items-center gap-1 cursor-pointer">
            <Button
              icon={<GlobalOutlined />}
              style={{ borderRadius: 26 }}
              className="flex items-center"
            >
              <DownOutlined />
            </Button>
          </span>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
