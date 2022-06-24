const axios = require("axios");
const cheerio = require("cheerio");
const twilio = require("twilio");
require("dotenv").config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(twilioAccountSid, twilioAuthToken);

const url =
  "https://www.amazon.co.uk/Apple-24-inch-8%E2%80%91core-7%E2%80%91core-ports/dp/B0932Y7SLQ?ref_=ast_slp_dp&th=1";

const product = {
  name: "",
  price: "",
  link: "",
};

const handle = setInterval(scrape, 15000);

async function scrape() {
  axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      const $ = cheerio.load(data);

      const item = $("div#dp-container");

      product.name = $(item).find("h1 span#productTitle").text().trim();

      const price = $(item)
        .find("span .a-price-whole")
        .first()
        .text()
        .replace(/[,.]/g, "");

      const priceNum = parseInt(price);
      product.price = priceNum;
      product.link = url;

      if (priceNum < 1500) {
        client.messages
          .create({
            body: `The price of ${product.name} went below ${priceNum}. Purchase it at: ${product.link}`,
            from: "+18643653052",
            to: "+5537999828979",
          })
          .then((message) => {
            console.log(message);
            clearInterval(handle);
          });
      }
    })
    .catch((err) => console.log(err));
}

scrape();
