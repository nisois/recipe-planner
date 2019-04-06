import React from "react";
import { Card, Label } from "semantic-ui-react";

export const MealRecipe = ({ meal }) => {
  const mealTagsFormating = () =>
    meal.tags.map((tag, key) => <Label key={key}>{tag}</Label>);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{meal.title}</Card.Header>
        <Card.Meta>{mealTagsFormating()}</Card.Meta>
        <Card.Description>{meal.comment}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={meal.url} target="_blank" rel="noopener noreferrer">
          See Recipe
        </a>
      </Card.Content>
    </Card>
  );
};
