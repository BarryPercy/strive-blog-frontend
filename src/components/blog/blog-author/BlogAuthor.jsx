import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { author, avatar } = props;
  console.log(author)
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <h6>by {author[0].firstName} {author[0].lastName}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
