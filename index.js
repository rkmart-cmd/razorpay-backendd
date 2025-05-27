const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_live_gXO7nF67DHnjQl",         // <-- Your Live Razorpay Key
  key_secret: "4MFH63Ry75aZA1ojgzKlCXX9"           // <-- Your Razorpay Secret
});

app.post("/create-order", async (req, res) => {
  const { amount, receipt } = req.body;

  try {
    const options = {
      amount: amount,        // in paisa
      currency: "INR",
      receipt: receipt
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
