import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const post = {
      "title": formData.get("title"),
      "category": formData.get("category"),
      "content": html,
      "cover": formData.get("cover"),
      "readTime": {
        "value": formData.get("read-time-value"),
        "unit": formData.get("read-time-unit")
      },
      "author": {
        "name": formData.get("author-name"),
        "avatar": formData.get("author-avatar")
      }
    };
    try {
      let response = await fetch(
        "http://localhost:3001/blogPosts",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
      } else {
        alert("Fetching went wrong!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" name="title"/>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" name="category">
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control size="lg" placeholder="image link" name="cover" />
        </Form.Group>
        <Form.Group controlId="read-time-value" className="mt-3">
          <Form.Label>Read Time</Form.Label>
          <Form.Control size="lg" placeholder="value" name="read-time-value"/>
        
        <Form.Group controlId="read-time-unit" className="mt-3"></Form.Group>
          <Form.Control size="lg" placeholder="unit" name="read-time-unit"/>
        </Form.Group>
        <Form.Group controlId="author-name" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="name" name="author-name"/>
        </Form.Group>
        <Form.Group controlId="author-avatar" className="mt-3">
          <Form.Control size="lg" placeholder="image-link" name="author-avatar"/>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
