import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);
  const getAttachment = async (id)=>{
    try{
      let response = await fetch(
        process.env.REACT_APP_BACK_END+"/"+id+"/pdf/attachment"
      )
      if (response.ok){
        const data = response.json();
        console.log(data)
      }
    }catch(error){
      console.log(error)
    }
  }
  const sendEmail = async (data) =>{
    const email = {
      "text":`New article posted by you ${data.author.name}, it is titled ${data.title}`,
      "html":`<h3>Dear ${data.author.name}</h3>
        <p>New article posted!</p>`,
      "subject": `New - ${data.title}`,
      "recipient": data.author.email
    }
    try{
      let response = await fetch(
        process.env.REACT_APP_BACK_END+"/authors/register",
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok){
        console.log("email sent")
      }
    }catch(error) {
      console.log(error);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const post = {
      "title": formData.get("title"),
      "category": formData.get("category"),
      "content": html,
      "cover": "https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png",//process.env.REACT_APP_BACK_END+"http://localhost:3001/img/authors/default-avatar.jpg",
      "readTime": {
        "value": formData.get("read-time-value"),
        "unit": formData.get("read-time-unit")
      },
      "author": {
        "name": formData.get("author-name"),
        "avatar": "",
        "email": formData.get("author-email")
      }
    };
    console.log(post)
    try {
      let response = await fetch(
        process.env.REACT_APP_BACK_END+"/blogPosts",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        getAttachment(data.id)
        sendEmail(post);
      } else {
        
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
        <Col lg={6}> 
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Enter Title" name="title"/>
          </Form.Group>
        </Col>
        <Col lg={4}> 
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="md" as="select" name="category">
              <option disabled selected></option>
              <option>Culture</option>
              <option>DIY</option>
              <option>Fashion</option>
              <option>Food</option>
              <option>Science</option>
              <option>Technology</option>
              <option>Travel</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Form.Group controlId="read-time" className="mt-3">
          <Form.Label>Read Time</Form.Label>
          <Row>
            <Col lg={2}>
              <Form.Control size="md" placeholder="value" name="read-time-value"/>
            </Col>
            <Col lg={2}>
            <Form.Control size="md" as="select" name="read-time-unit" defaultValue="Minutes">
              <option>Seconds</option>
              <option>Minutes</option>
              <option>Hours</option>
            </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="read-time" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Row>
            <Col lg={2}>
              <Form.Control size="md" placeholder="value" name="author-name"/>
            </Col>
            <Col lg={2}>
            <Form.Control type="email" size="md" placeholder="email"name="author-email">
            </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        {/* <Form.Group controlId="author-avatar" className="mt-3">
          <Form.Control size="md" placeholder="image-link" name="author-avatar"/>
        </Form.Group> */}
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
