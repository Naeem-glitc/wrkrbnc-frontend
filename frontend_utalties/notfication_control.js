"use client"
import toast from "react-hot-toast";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    duration: 4000,
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    duration: 3000,
  });
};
