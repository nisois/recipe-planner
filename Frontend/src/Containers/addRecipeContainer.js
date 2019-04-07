import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import AddRecipe from "../Components/addRecipe";

export const AddRecipeContainer = () => (
  <React.Fragment>
    <Modal.Header>Add a recipe</Modal.Header>
    <Modal.Content>
      <AddRecipe />
    </Modal.Content>
  </React.Fragment>
);
