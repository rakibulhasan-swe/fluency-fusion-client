import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FeedbackModal = ({ close, course, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // feedback
  const onSubmit = (data, e) => {
    axiosSecure
      .patch(`/courses/feedback/${course?._id}`, {
        feedback: data.feedback,
      })
      .then((newData) => {
        if (newData?.data.modifiedCount > 0) {
          refetch();
          // feedback success alert
          swal({
            title: "Good job!",
            text: "Feedback given successfully!!",
            icon: "success",
            button: "Ok",
          });
        }
      });
    e.target.reset();
  };
  return (
    <div>
      <>
        <Modal
          show={true}
          onHide={() => close(0)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="Feedback">
                <Form.Control
                  as="textarea"
                  placeholder="feedback"
                  rows={5}
                  {...register("feedback", { required: true })}
                />
                {errors.feedback && (
                  <span className="text-danger">
                    Feedback field is required
                  </span>
                )}
              </Form.Group>
              <Button
                className="w-100 fw-bold text-white"
                variant="primary"
                type="submit"
                style={{ padding: "0.5rem 0rem" }}
              >
                Feedback
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => close(0)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default FeedbackModal;
