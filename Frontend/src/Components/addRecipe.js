import React, { Component } from "react";
import { Label, Form, Input } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import {
  TITLE_CHANGE,
  COMMENT_CHANGE,
  URL_CHANGE,
  TAGS_CHANGE,
  ADD_RECIPE_INITIAL,
  TYPE_CHANGE,
  TAG_CHANGE
} from "../Constants/ActionTypes";

class AddRecipe extends Component {
  handleCommentChange = event => this.props.onCommentChange(event.target.value);

  handleTitleChange = event => this.props.onTitleChange(event.target.value);

  handleUrlChange = event => this.props.onUrlChange(event.target.value);

  handleTagChange = event => this.props.onTagChange(event.target.value);

  handleTagSubmit = () => {
    this.props.onTagsChange(this.props.recipe.tag);
    this.props.onTagChange("");
  };

  handleTypeChange = event => {
    this.props.onTypeChange(event.target.textContent);
  };

  handleSubmit = async () => {
    let result = await axios.post(
      "http://localhost:4000/addRecipe",
      this.props.recipe
    );
    this.props.onSubmit();
    alert(result.data.message);
  };

  render() {
    let formatedTagsArr = [];
    if (this.props.recipe.tags.length > 0) {
      formatedTagsArr = this.props.recipe.tags.map((tag, key) => (
        <Label key={key} style={{ backgroundColor: "#FFE066" }}>
          {tag}
        </Label>
      ));
    }

    return (
      <Form size="large">
        <Form.Input
          fluid
          value={this.props.recipe.title}
          label="Title"
          placeholder="Title"
          onChange={this.handleTitleChange}
        />
        <Form.Input
          fluid
          value={this.props.recipe.url}
          label="URL"
          placeholder="Link to the recipe"
          onChange={this.handleUrlChange}
        />
        <Form.Field style={{ marginBottom: "0px" }}>
          <label>Tags</label>
        </Form.Field>
        <Form.Group inline widths="equal">
          <Form.Input
            fluid
            value={this.props.recipe.tag}
            // label="Tags"
            placeholder="Add a tag (maximum 3)"
            onChange={this.handleTagChange}
          />
          <Form.Button label="" onClick={this.handleTagSubmit}>
            Add Tag
          </Form.Button>
        </Form.Group>
        <Form.Field>{formatedTagsArr}</Form.Field>
        <Form.Group inline>
          <Form.Radio
            label="Meal"
            value="meal"
            checked={this.props.recipe.type === "Meal"}
            onChange={this.handleTypeChange}
          />
          <Form.Radio
            label="Side"
            value="side"
            checked={this.props.recipe.type === "Side"}
            onChange={this.handleTypeChange}
          />
        </Form.Group>
        <Form.TextArea
          label="Description or Comment"
          placeholder="What do you have to say about this recipe..."
          onChange={this.handleCommentChange}
          value={this.props.recipe.comment}
        />
        <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTitleChange: title =>
      dispatch({
        type: TITLE_CHANGE,
        payload: title
      }),
    onCommentChange: comment =>
      dispatch({
        type: COMMENT_CHANGE,
        payload: comment
      }),
    onUrlChange: url =>
      dispatch({
        type: URL_CHANGE,
        payload: url
      }),
    onTagsChange: tag =>
      dispatch({
        type: TAGS_CHANGE,
        payload: tag
      }),
    onSubmit: () =>
      dispatch({
        type: ADD_RECIPE_INITIAL
      }),
    onTypeChange: type =>
      dispatch({
        type: TYPE_CHANGE,
        payload: type
      }),
    onTagChange: tag =>
      dispatch({
        type: TAG_CHANGE,
        payload: tag
      })
  };
};

const mapStateToProps = state => {
  return { recipe: state.addRecipe };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe);
