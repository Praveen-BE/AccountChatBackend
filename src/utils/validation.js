import validator from "validator";
import { phone } from "phone";

export const validateSignUpData = (req) => {
  const {
    emailId,
    mobileCountryCode,
    mobileNumber,
    createPassword,
    confirmPassword,
  } = req.body;
  const verifyMobileNumber = phone(mobileCountryCode + mobileNumber);
  if (!verifyMobileNumber?.isValid) {
    throw new Error("Country code or Number is not Valid !...");
  } else if (createPassword != confirmPassword) {
    throw new Error("CreatePassword and ConfirmPassword is not Same!...");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid !...");
  } else if (!validator.isStrongPassword(createPassword)) {
    throw new Error("Please Enter Strong Password...");
  }
};

export const validateSignInData = (req) => {
  const { emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid !...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter the Valid Password !...");
  }
};
