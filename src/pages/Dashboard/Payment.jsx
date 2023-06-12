import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useEnrolled from "../../hooks/useEnrolled";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NGkG6Iy3s0p8WtXjeeDNhVHgnUQnCNtnkHDobiVg4AwdxatRhc6tIbKivtWeMuqk5CeOCcKT7HlLo6HcRI4Vitw00M5Hb4bHc"
);
const Payment = () => {
  const [course, setCourse] = useState({});
  const [enrolled] = useEnrolled();
  const { id } = useParams();
  useEffect(() => {
    const exactCourse = enrolled.find((c) => c._id === id);
    setCourse(exactCourse);
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
