import toast from "react-hot-toast";

export const validateLoginForm = (data: {
  email: string;
  password: string;
  masterKey: string;
}): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  if (!emailRegex.test(data.email)) {
    toast.error("Invalid email address.");
    return false;
  }

  if (!passwordRegex.test(data.password)) {
    toast.error("Invalid password.");
    return false;
  }

  if (data.password === data.masterKey) {
    toast.error("Password and master key must not be the same.");
    return false;
  }

  if (data.masterKey.length < 12) {
    toast.error("Master key must be at least 12 characters.");
    return false;
  }

  return true;
};
