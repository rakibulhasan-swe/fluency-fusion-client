import React from "react";
import { Button, Card } from "react-bootstrap";

const InstructorCard = ({ data }) => {
  const { name, email, image } = data;
  return (
    <>
      <div className="col-lg-4">
        <Card className="border-0 shadow">
          <Card.Img
            className="img-fluid"
            style={{ height: "19rem" }}
            variant="top"
            src={image}
          />
          <Card.Body>
            <Card.Title className="fw-semibold">Name: {name}</Card.Title>
            <Card.Text className="fw-light">Email: {email}</Card.Text>
            <Button>See Class</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default InstructorCard;
