import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";

const CheckoutForm = ({ course, price }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    // creating
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment info to server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        date: new Date(),
        ...course,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.result.insertedId) {
          // alert
          swal({
            title: "Good job!",
            text: "Payment info added",
            icon: "success",
            button: "Ok",
          });
        }
      });
    }
  };

  return (
    <div className="py-5">
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {cardError && <p className="text-danger">{cardError?.message}</p>}
        {transactionId && (
          <p style={{ color: "green" }}>{"Transaction successfull"}</p>
        )}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          className="mt-3"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
