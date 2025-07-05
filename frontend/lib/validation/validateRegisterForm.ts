import toast from "react-hot-toast";

export const validateRegisterForm = (data: {
  name: string;
  email: string;
  password: string;
  masterKey: string;
}): boolean => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  if (!nameRegex.test(data.name)) {
    toast.error("Invalid name. Only letters allowed.");
    return false;
  }

  if (!emailRegex.test(data.email)) {
    toast.error("Invalid email address.");
    return false;
  }

  if (data.password === data.masterKey) {
    toast.error("Password and master key must not be the same.");
    return false;
  }

  if (!passwordRegex.test(data.password)) {
    toast.error("Password must include uppercase, lowercase, number, and symbol.");
    return false;
  }

  if (data.masterKey.length < 12) {
    toast.error("Master key must be at least 12 characters.");
    return false;
  }

  return true;
};
