import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function Checkout() {
    return (
        <div className="container">
            <h2 className="text-center">Check out</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="tẽt" placeholder="Address" />
                    </Form.Group>
                </Row>

                {/* <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Row> */}

                {/* <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Checkout;