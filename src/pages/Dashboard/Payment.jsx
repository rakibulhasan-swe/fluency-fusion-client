import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const Payment = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id]);

  return (
    <div className="py-3">
      <Elements stripe={stripePromise}>
        <CheckoutForm course={course} price={course?.price} />
      </Elements>
    </div>
  );
};

export default Payment;
