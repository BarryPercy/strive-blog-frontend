import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const handlePDF=async()=>{
    try {
      const response = await fetch(
        process.env.REACT_APP_BACK_END+"/"+params.id+"/pdf",
      );
      console.log(process.env.REACT_APP_BACK_END+"/"+params.id+"/pdf")
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
  const fetchPost = async (id)=>{
    try {
      const response = await fetch(
        process.env.REACT_APP_BACK_END+"/blogPosts/"+id,
      );
      if (response.ok) {
        let data = await response.json();
        setBlog(data)
        setLoading(false)
      } else {
        alert("Fetching went wrong!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const id  = params.id;
    //const blog = posts.find((post) => post.id.toString() === id);
    console.log(id)
    fetchPost(id);
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
                <Button onClick={handlePDF}>Download PDF</Button>
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};


export default Blog;
