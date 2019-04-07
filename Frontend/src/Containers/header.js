import React, { Component } from "react";
import { Menu, Modal } from "semantic-ui-react";
import { AddRecipeContainer } from "./addRecipeContainer";

export const HeaderContainer = () => (
  <Menu style={{ backgroundColor: "#FFE066" }}>
    <Menu.Menu position="left">
      <Menu.Item header>Meal Planner</Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Modal trigger={<Menu.Item name="add recipe">Add Recipe</Menu.Item>}>
        {<AddRecipeContainer />}
      </Modal>
      <Menu.Item name="update" onClick={() => <AddRecipeContainer />}>
        Update Menu
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
