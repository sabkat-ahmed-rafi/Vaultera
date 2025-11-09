"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { FaCameraRetro } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function ProfileUpdateCard() {
  const [currentUser, setCurrentUser] = useState<{ name: string; photo: string } | null>(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosSecure.get("/api/user/me");
        const user = res.data;
        setCurrentUser(user);
        setName(user.name);
        setPhoto(user.photo);
      } catch (err) {
        console.log("Failed to load user", err);
      }
    })();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const handleSave = async () => {
    if (!currentUser) return;
    try {
      setIsSaving(true);

      let uploadedUrl = photo;

      if (file) {
        uploadedUrl = await uploadToCloudinary(file);
      }

      const payload: any = {};
      if (name !== currentUser.name) payload.name = name;
      if (file) payload.photo = uploadedUrl;

      if (Object.keys(payload).length === 0) {
        setIsSaving(false);
        return;
      }

      await axiosSecure.put("/api/user/update-profile", payload);

      // Update UI
      setCurrentUser((prev) => (prev ? { ...prev, ...payload } : null));
      setPhoto(uploadedUrl);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.log("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: "100vh", background: "black", color: "white" }}>
        <Text>Loading profile...</Text>
      </Flex>
    );
  }

  const isChanged = preview || name !== currentUser.name;

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        background: "black",
        padding: "1rem",
        color: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 420 }}
      >
        <Card
          size="3"
          style={{
            width: "100%",
            padding: "2rem",
            borderRadius: "1.5rem",
            background: "#111",
            border: "1px solid #222",
            boxShadow: "0 10px 30px rgba(255,255,255,0.05)",
          }}
        >
          <Flex direction="column" align="center" gap="5" style={{ width: "100%" }}>
            {/* Profile Photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={{
                position: "relative",
                width: "130px",
                height: "130px",
                cursor: "pointer",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid white",
                boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image
                src={preview || photo}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
              />
              <motion.div
                whileHover={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.2s",
                }}
              >
                <FaCameraRetro size={28} color="white" />
              </motion.div>
            </motion.div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />

            {/* Name Input */}
            <Flex direction="column" gap="2" style={{ width: "100%" }}>
              <Text size="2" weight="medium" color="gray">
                Your Name
              </Text>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <TextField.Root
                  size="3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    background: "#000",
                    border: "1px solid #333",
                    fontSize: "1rem",
                    color: "white",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = "1px solid white")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = "1px solid #333")
                  }
                />
              </motion.div>
            </Flex>

            {/* Save Button */}
            <motion.div
              whileHover={isChanged ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.97 }}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              <Button
                size="3"
                color="gray"
                variant="solid"
                disabled={!isChanged || isSaving}
                onClick={handleSave}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  background: isChanged ? "white" : "#222",
                  color: isChanged ? "black" : "#666",
                  transition: "all 0.25s ease",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  padding: "1rem",
                }}
              >
                {isSaving
                  ? "Saving..."
                  : isChanged
                  ? "Save Changes"
                  : "No Changes"}
              </Button>
            </motion.div>

            <Text size="1" color="gray" align="center">
              Only changed fields will be updated.
            </Text>
          </Flex>
        </Card>
      </motion.div>
    </Flex>
  );
}
