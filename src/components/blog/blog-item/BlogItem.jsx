import React from "react";
import { Card, Modal, Button, Form  } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import { useState } from "react";
import "./styles.css";
const BlogItem = (props) => {
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCurrentBlogPostId(id)
    setShow(true);
  }
  const handleSubmit = async (event)=>{
    event.preventDefault();
    const formData = new FormData()
    formData.append("cover", image)
    try {
      console.log("submitting")
      let response = await fetch(
        process.env.REACT_APP_BACK_END+"/blogPosts/"+currentBlogPostId+"/single",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        handleClose();
      } else {
        alert("Fetching went wrong!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);
  const [currentBlogPostId, setCurrentBlogPostId] = useState("")
  const [image, setImage] = useState(undefined);
  const { title, category, cover, author, id, readTime } = props;
  console.log("item props", props)
  return (
      <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group>
                <Form.Label>Choose an image to upload:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage((e.target)?.files?.[0])
                  }
                />
              </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
        <Card className="blog-card" key={id}>
          <Card.Img variant="top" src={cover} className="blog-cover" onClick={()=>handleShow(props.id)}/>
          <Card.Body>
            <Link to={`/blog/${id}`} className="blog-link">
              <Card.Title>{title}</Card.Title>
            </Link>
            <Card.Text>{category}</Card.Text>
            <Card.Text>{readTime.value} {readTime.unit}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor author={props.authors} />
          </Card.Footer>
        </Card>
     
     </>
  );
};

export default BlogItem;
