import React from "react";
import { Card, Label } from "semantic-ui-react";

export const SideRecipe = ({ side }) => {
  const sideTagsFormating = () =>
    side.tags.map((tag, key) => (
      <Label key={key} style={{ backgroundColor: "#FFE066" }}>
        {tag}
      </Label>
    ));

  return (
    <Card fluid>
      <Card.Content style={{ backgroundColor: "#FFFCF1" }}>
        <Card.Header style={{ marginBottom: "10px" }}>{side.title}</Card.Header>
        <Card.Meta style={{ marginBottom: "10px" }}>
          {sideTagsFormating()}
        </Card.Meta>
        <Card.Description>{side.comment}</Card.Description>
      </Card.Content>
      <Card.Content extra style={{ backgroundColor: "#FFF6D5" }}>
        <a href={side.url} target="_blank" rel="noopener noreferrer">
          See Recipe
        </a>
      </Card.Content>
    </Card>
  );
};
