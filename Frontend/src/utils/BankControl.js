// all enviroment for bank api
// declared in .env.local
import axios from "axios";
const { v4: uuidv4 } = require('uuid');

const url = "https://api-sandbox.partners.scb/partners/sandbox";

const billerId = process.env.REACT_APP_BILLER_ID;

const generateRef = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

const generateTrackId = () => {
  const trackId = uuidv4();
  console.log(`trackID generated: ${trackId}`)
  return trackId;
};

const getCurrentDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const headerConfig = (requestId) => {
  const config = {
    headers: {
      "content-type": "application/json",
      resourceOwnerId: "Bearer " + process.env.REAC_APP_BANK_KEY,
      requestUid: requestId,
      authorization: process.env.REAC_APP_BANK_TOKEN,
      "accept-language": "TH",
    },
  };
  return config;
};

export async function createQR(amount) {
  const ref1 = generateRef;
  const requestId = uuidv4()
  console.log(`request generated: ${requestId}`)
  const date = getCurrentDate;

  const res = await axios.post(
    `${url}/v1/payment/qrcode/create`,
    {
      qrType: "PP",
      amount: amount,
      ppType: "BILLERID",
      ppId: billerId,
      ref1: ref1,
      date: date,
    },
    headerConfig(requestId)
  );
  if (res.status.code === 1000) {
    const result = {
      requestId: requestId,
      qrRawData: res.data.qrRawData,
      qrImage: res.data.qrImage,
      ref1: ref1,
    };
    return result;
  } else {
    console.log(`Error while creating QR: ${res}`);
  }
}

export async function isPaid(ref, date, requestId) {
  const res = await axios.get(
    `${url}/​partners/​v1/​payment/​billpayment/​inquiry?billerId=${billerId}&reference1=${ref}&transactionDate=${date}&eventCode=00300100`,
    headerConfig(requestId)
  );
  if (res.status.code === 1000) {
    return res.data;
  } else {
    return false;
  }
}
