import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imageName from "../../image/pepe.jpeg"

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [publishDate, setDate] = useState(new Date());  // look into it
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    // let token = localStorage.getItem('token');

    const clearForm = (e) => {
        e.preventDefault();
        reset();
    }

    const fileHandler = event => {
        setFile(event.target.files[0])
    }

    const reset = () => {
        window.location.reload(true);
    }

    const submit = (event) => {
        event.preventDefault();
        if (!description) {
            alert(`Additional data is required`);
        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('number', number);
            formData.append('publishDate', publishDate);
            formData.append('description', description);
            formData.append('files', file);

            fetch('http://localhost:8100/Some API link', {
                method: 'POST',
                // headers: {
                //     'X-ACCESS-TOKEN': token
                // },
                body: formData
            })
                .then((response) => {
                    return response.json()
                })
                .then((responseJson) => {
                    if (responseJson.success) {
                        alert("Data uploaded successfully");
                    } else {
                        alert("Error occurred");
                    }
                    reset();
                });
        }
    }

    return (
        <Container>
            <Card style={{backgroundColor: "lightblue"}}>
                <Card.Header>
                    <h1>Registration Form</h1>
                </Card.Header>
                <br></br>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="FormName">
                                    <Form.Label>Enter Name</Form.Label>
                                    <Form.Control type='name' placeholder='Enter Name'
                                                  onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                                <br/>
                            </Col>
                            <Col>
                                <Form.Group controlId="FormEmail">
                                    <Form.Label>Enter Email</Form.Label>
                                    <Form.Control type='email' placeholder='Enter Email'
                                                  onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <br/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId="FormNumber">
                                    <Form.Label>Enter Phone Number</Form.Label>
                                    <Form.Control type='number' placeholder='Enter Phone Number' maxLength={10}
                                                  onChange={(e) => setNumber(e.target.value)}/>
                                </Form.Group>
                                <br/>
                            </Col>
                            <Col>
                                <Form.Group controlId="FormPublishDate">
                                    <Form.Label>Registration Date</Form.Label>
                                    <DatePicker selected={publishDate} onChange={publishDate => setDate(publishDate)}/>
                                </Form.Group>
                                <br/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId="FormDescription">
                                    <Form.Label>Enter anything else you want to add</Form.Label>
                                    <Form.Control
                                        value={description}
                                        type='description'
                                        placeholder='Enter Description'
                                        style={{height: '100px'}}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="FormFile">
                                    <Form.Label><h5>Upload Resume</h5></Form.Label>
                                    <br/>
                                    <input type="file" name="file" onChange={fileHandler}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <br/>

                    <Row>
                        <Col>
                            <Button variant='primary' type='submit' onClick={(event) => submit(event)}>Submit</Button>
                        </Col>
                        <Col>
                            <Button variant='primary' onClick={(event) => clearForm(event)}>clear</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Register;