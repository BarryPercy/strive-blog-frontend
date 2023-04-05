import { Form, Button, Container, Row, Col } from "react-bootstrap"
import "./styles.css";
import { useState } from "react";


const Login = ()=>{
    const [formObject, setFormObject] = useState({
        email: "",
        password: "",
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(
              `${process.env.REACT_APP_BACK_END}/authors/login/`,
              {
                method: "POST",
                body: JSON.stringify(formObject),
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            if(response.ok){
                response = await response.json();
                console.log(response.accessToken);
                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
            }
          } catch (error) {
            console.log(error);
          }
      };
    return(
        <Container fluid className="main-title">
            <Row className="d-flex justify-content-center">
                <Col xs={6} sm={4} md={3}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" 
                                value={formObject.name}
                                onChange={(e) => {
                                  setFormObject({
                                    ...formObject,
                                    email: e.target.value,
                                  });
                                }}
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" 
                                value={formObject.name}
                                onChange={(e) => {
                                  setFormObject({
                                    ...formObject,
                                    password: e.target.value,
                                  });
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login