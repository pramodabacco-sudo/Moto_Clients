// controllers/otp.controller.js
import prisma from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
import axios from "axios";

const otpStore = new Map();

// helper to normalize phone
const normalizePhone = (phone) => {
  return phone.replace(/\D/g, "");
};

export const sendOtp = async (req, res, next) => {
  try {
    console.log("========== SEND OTP START ==========");

    let { phone } = req.body;
    console.log("Incoming phone:", phone);

    if (!phone) {
      console.log("❌ Phone missing");
      return res.status(400).json({ message: "Phone number required" });
    }

    phone = normalizePhone(phone);
    console.log("Normalized phone:", phone);

    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }
    console.log("Final phone (with country code):", phone);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    // store OTP
    otpStore.set(phone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });
    console.log("OTP stored in memory");

    // ✅ MUST match DLT template EXACTLY
    // const message = encodeURIComponent(rawMessage);
    const message = `${otp} is your OTP for Abacco Technology CRM login verification. OTP valid for 10 minutes. Do not share this OTP with anyone.`;
    console.log("Final SMS message:", message);

    // API URL
    const smsUrl = "https://www.smsgatewayhub.com/api/mt/SendSMS";

    const params = {
      APIKey: process.env.SMS_API_KEY,
      senderid: process.env.SMS_SENDER_ID,
      channel: 2,
      DCS: 0,
      flashsms: 0,
      number: phone,
      text: message,
      route: process.env.SMS_ROUTE,
      EntityId: process.env.SMS_ENTITY_ID,
      dlttemplateid: process.env.SMS_TEMPLATE_ID,
    };

    console.log("SMS PARAMS:", params);

    // API call
    const { data } = await axios.get(smsUrl, { params });

    console.log("SMS RAW RESPONSE:", JSON.stringify(data, null, 2));

    // validate response
    if (data?.ErrorCode !== "000") {
      console.error("❌ SMS FAILED:", data?.ErrorMessage || data);
      return res.status(500).json({
        success: false,
        message: data?.ErrorMessage || "Failed to send OTP",
      });
    }

    console.log("✅ SMS SENT SUCCESSFULLY");

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

    console.log("========== SEND OTP END ==========\n");
  } catch (err) {
    console.error("❌ Send OTP Exception:", err?.response?.data || err.message);
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    console.log("========== VERIFY OTP START ==========");

    let { phone, name, email, otp } = req.body;
    console.log("Incoming verify request:", { phone, otp });

    if (!phone || !otp) {
      console.log("❌ Missing phone or OTP");
      return res.status(400).json({ message: "Phone and OTP required" });
    }

    phone = normalizePhone(phone);

    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }

    console.log("Normalized phone:", phone);

    const record = otpStore.get(phone);
    console.log("OTP record found:", record ? "YES" : "NO");

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (record.expires < Date.now()) {
      console.log("❌ OTP expired");
      otpStore.delete(phone);
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (record.otp !== otp) {
      console.log("❌ OTP mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    console.log("✅ OTP verified");

    otpStore.delete(phone);

    // find user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      console.log("Creating new user");
      user = await prisma.user.create({
        data: {
          name,
          phone,
          email,
        },
      });
    } else {
      console.log("User already exists");
    }

    const token = generateToken({ userId: user.id });
    console.log("Token generated");

    res.json({
      success: true,
      token,
      user,
    });
        
    console.log("========== VERIFY OTP END ==========\n");
  } catch (err) { 
    console.error("❌ Verify OTP Error:", err);
    next(err);
  }
};

export { otpStore };
