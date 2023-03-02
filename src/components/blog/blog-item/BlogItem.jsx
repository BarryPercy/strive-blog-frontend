import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, category, cover, author, _id, readTime } = props;
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card" key={_id}>
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{category}</Card.Text>
          <Card.Text>{readTime.value} {readTime.unit}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor {...author} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
