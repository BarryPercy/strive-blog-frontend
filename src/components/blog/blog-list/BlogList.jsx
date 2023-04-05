import React, { useState } from "react";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useEffect } from "react";
const BlogList = (props) => {
  const [posts,setPosts] = useState([])
  const fetchPosts = async ()=>{
    try {
      
      const accessToken = JSON.parse(localStorage.getItem('accessToken'));
      console.log(accessToken)
      const response = await fetch(
        process.env.REACT_APP_BACK_END+"/authors/me/stories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      console.log(process.env.REACT_APP_BACK_END)
      if (response.ok) {
        let data = await response.json();
        setPosts(data)
      } else {
        alert("Fetching went wrong!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  return (
    <Row>
      {posts.length>0?posts.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
          key={post.id}
        >
          <BlogItem {...post} key={post.title} id={post.id}  />
        </Col>
      )):""}
    </Row>
  );
};

export default BlogList;
