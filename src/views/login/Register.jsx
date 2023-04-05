import { Form, Button, Container, Row, Col } from "react-bootstrap"
import "./styles.css";
import { useState } from "react";

const Register = ()=>{
    const [formObject, setFormObject] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "User",
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(
              `${process.env.REACT_APP_BACK_END}/authors/register/`,
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
                console.log(response);
            }
          } catch (error) {
            console.log(error);
          }
      };
    return(
        <Container fluid className="main-title">
            <Row className="d-flex justify-content-center">
                <Col lg={3} >
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
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" 
                                value={formObject.name}
                                onChange={(e) => {
                                  setFormObject({
                                    ...formObject,
                                    firstName: e.target.value,
                                  });
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" 
                                value={formObject.name}
                                onChange={(e) => {
                                  setFormObject({
                                    ...formObject,
                                    lastName: e.target.value,
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

export default Register