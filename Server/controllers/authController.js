import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { Op } from "sequelize";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../helper/emailHelper.js";

export const signUpController = async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, password } = req.body;

  try {
    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    generateTokenSetCookie(res, newUser.id, newUser.role);

    await sendVerificationEmail(newUser.email, verificationToken);

    const userData = { ...newUser.get() };
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmailController = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Verification code is required",
    });
  }

  console.log("Verification code received:", code);

  try {
    const user = await User.findOne({
      where: {
        verificationToken: code,
        verificationTokenExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;

    await sendWelcomeEmail(user.email, user.firstName);
    await user.save();
    const userData = { ...user.get() };
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified. Please check your email.",
      });
    }

    const isPasswordMatched = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateTokenSetCookie(res, existingUser.id, existingUser.role);

    existingUser.lastLogin = new Date();
    await existingUser.save();

    const userData = { ...existingUser.get() };
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: userData,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.log("Something went wrong on forgotPassword", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Something went wrong on resetPassword", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resendVerificationEmailController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    const newToken = Math.floor(100000 + Math.random() * 900000).toString();
    const newTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.verificationToken = newToken;
    user.verificationTokenExpiresAt = newTokenExpiry;
    await user.save();

    await sendVerificationEmail(user.email, newToken);

    res.status(200).json({
      success: true,
      message: "A new verification email has been sent",
    });
  } catch (error) {
    console.log("Error resending verification email", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove sensitive data
    const userData = { ...user.get() };
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "User found",
      user: userData,
    });
  } catch (error) {
    console.log("Something went wrong on checkAuth", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
