require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.post('/data', async (req, res) => {
  try {
    const apiCall = await fetch("https://devcore02.cimet.io/v1/generate-token", {
        headers: {
            "Api-key":"4NKQ3-815C2-8T5Q2-16318-55301"
        },
        method: "post",
    })
    return res.send("hi");
} catch (error) {
    res.status(500).json({ error });
}
})

app.listen(PORT, () => {
  console.log(`server is connected successfully on ${PORT}`);
})