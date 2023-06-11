import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaGraduationCap } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const {
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    image,
  } = course;
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <Card className="border-0 shadow">
          <Card.Img variant="top" src={image} />
          <Card.Body className="p-4">
            <Card.Title className="fw-semibold">{className}</Card.Title>
            <Card.Text className="fw-light">
              Instructor: {instructorName}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center py-2">
              <Card.Text className="fw-semibold">
                <FaGraduationCap className="fs-4 me-1 d-text" />
                {availableSeats} Seats
              </Card.Text>
              <Card.Text className="fw-semibold">${price}</Card.Text>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Card.Text>{instructorEmail}</Card.Text>
              <Button className="btn-primary">Enroll Now</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CourseCard;
