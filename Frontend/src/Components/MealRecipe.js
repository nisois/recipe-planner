import React from "react";
import { Card, Label } from "semantic-ui-react";

export const MealRecipe = ({ meal }) => {
  const mealTagsFormating = () =>
    meal.tags.map((tag, key) => (
      <Label key={key} style={{ backgroundColor: "#FFE066" }}>
        {tag}
      </Label>
    ));

  return (
    <Card fluid>
      <Card.Content style={{ backgroundColor: "#FFFCF1" }}>
        <Card.Header style={{ marginBottom: "10px" }}>{meal.title}</Card.Header>
        <Card.Meta style={{ marginBottom: "10px" }}>
          {mealTagsFormating()}
        </Card.Meta>
        <Card.Description>{meal.comment}</Card.Description>
      </Card.Content>
      <Card.Content extra style={{ backgroundColor: "#FFF6D5" }}>
        <a href={meal.url} target="_blank" rel="noopener noreferrer">
          See Recipe
        </a>
      </Card.Content>
    </Card>
  );
};
