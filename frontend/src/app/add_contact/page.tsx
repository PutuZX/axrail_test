"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/Toast";
import Image from "next/image";

export default function New() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [errorStatus, setError] = useState(false);

  return (
    <div className="bg-blue-950 h-screen flex flex-col items-center justify-center text-black">
      <Toast
        message={toastMessage}
        visible={toastVisible}
        error={errorStatus}
      />
      <div className="flex bg-white py-20 md:px-24 px-16 rounded-xl border-2 border-gray-300 items-center justify-center">
        <div className="flex flex-col space-y-3 ">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={"/axrail_logo.png"}
              width={150}
              height={150}
              alt="axrail logo"
            />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Input Your Name"
            className="border-2 border-[#624696] h-12 rounded-xl p-4 text-center"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Input Your Phone Number"
            className="border-2 border-[#624696] h-12 rounded-xl p-4 text-center"
          />
          <div className="pt-4">
            <button
              onClick={addContact}
              className="bg-green-500 w-fit text-white py-2 px-12 rounded-xl"
            >
              Add New Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  async function addContact() {
    setError(false);
    setToastVisible(false);
    const contactData = {
      name: name,
      phone: phone,
    };
    try {
      await axios.post("http://localhost:8000/api/contacts/", contactData);
      router.push("/");
    } catch (error) {
      setToastMessage("Failed to Update The Contact");
      setToastVisible(true);
      setError(true);
    }
  }
}
