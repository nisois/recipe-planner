import React from "react";
import { Card, Label } from "semantic-ui-react";

export const SideRecipe = ({ side }) => {
  const sideTagsFormating = () =>
    side.tags.map((tag, key) => <Label key={key}>{tag}</Label>);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{side.title}</Card.Header>
        <Card.Meta>{sideTagsFormating()}</Card.Meta>
        <Card.Description>{side.comment}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={side.url} target="_blank" rel="noopener noreferrer">
          See Recipe
        </a>
      </Card.Content>
    </Card>
  );
};
