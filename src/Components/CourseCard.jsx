import React from "react";
import { Button, Card } from "react-bootstrap";

const CourseCard = () => {
  return (
    <div>
      <div className="col-lg-4">
        <Card className="border-0">
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title className="fw-semibold">English</Card.Title>
            <Card.Text className="fw-light">desc</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Text>Lesson</Card.Text>
              <Card.Text>Students</Card.Text>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Card.Text>Ratings</Card.Text>
              <Button className="btn-primary">Enroll Now</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CourseCard;
