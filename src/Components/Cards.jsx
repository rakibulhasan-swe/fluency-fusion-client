import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsArrowRight } from "react-icons/Bs";
import { Link } from "react-router-dom";

const Cards = ({ singleBlog }) => {
  const { title, image, desc, date } = singleBlog;
  return (
    <>
      <div className="col-lg-4">
        <Card className="border-0">
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title className="fw-semibold">{title}</Card.Title>
            <Card.Text className="fw-light">{date}</Card.Text>
            <Card.Text className="fw-light">{desc}</Card.Text>
            <Link className="text-decoration-none fw-bold">
              Read More <BsArrowRight />
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Cards;
