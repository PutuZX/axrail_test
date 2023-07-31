"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Contact } from "@/interface/contact";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import EditModal from "@/components/edit/editContactModal";
import { Toast } from "@/components/Toast";
import Image from "next/image";

export default function Home() {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [errorStatus, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<Contact[]>(
        "http://localhost:8000/api/contacts"
      );
      let contact = res.data;
      contact.sort((a, b) => a.id - b.id);
      setContacts(contact);
    };

    fetchData();
  }, []);

  async function deleteContact(id: any) {
    setError(false);
    setToastVisible(false);
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${id}`);
      setToastMessage("The Contact Successfully Deleted!");
      setToastVisible(true);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setToastMessage("Failed to Delete The Contact");
      setToastVisible(true);
      setError(true);
    }
  }

  async function selectContact(id: any) {
    const res = await axios.get(`http://localhost:8000/api/contacts/${id}`);
    setName(res.data.name);
    setPhone(res.data.phone);
    setSelectedContact(id);
  }

  async function updateContact(id: any, name: string, phone: string) {
    setError(false);
    setToastVisible(false);
    try {
      await axios.put(`http://localhost:8000/api/contacts/${id}/`, {
        name: name,
        phone: phone,
      });
      setToastMessage("The Contact Successfully Updated!");
      setToastVisible(true);
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, name: name, phone: phone } : contact
        )
      );
    } catch (error) {
      setToastMessage("Failed to Update The Contact");
      setToastVisible(true);
      setError(true);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedContact(null);
  };

  return (
    <div className="bg-blue-950 h-screen flex flex-col items-center justify-center text-white">
      <Toast
        message={toastMessage}
        visible={toastVisible}
        error={errorStatus}
      />
      <div className="flex flex-col bg-white md:p-10 py-6 space-y-3 rounded-xl border-2 border-gray-300">
        <div className="flex items-center justify-center">
          <Image
            src={"/axrail_logo.png"}
            width={150}
            height={150}
            alt="axrail logo"
          />
        </div>
        {contacts.length > 0 ? (
          <div className="space-y-3 md:bg-gray-200 bg-white p-5 rounded-xl text-black overflow-y-auto h-[300px] md:h-auto md:overflow-y-visible">
            <div className="space-x-3 items-center text-center md:flex hidden text-[20px]">
              <div className="w-[400px]">
                <p>Name</p>
              </div>
              <div className="w-[200px]">
                <p>Number</p>
              </div>
            </div>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex md:flex-row flex-col md:space-x-3 space-y-6 md:space-y-0 items-center text-center bg-gray-500 md:bg-transparent md:bg-none p-4 md:p-0 rounded-xl md:rounded-0"
              >
                <div className="md:w-[400px] w-[280px] bg-white p-3 rounded-xl">
                  <p>
                    {contact.name.length > 35
                      ? `${contact.name.substring(0, 35)}...`
                      : contact.name}
                  </p>
                </div>

                <div className="md:w-[200px] w-[280px] bg-white p-3 rounded-xl">
                  <p>{contact.phone}</p>
                </div>
                <div className="flex md:space-x-3 space-x-6">
                  <div className="bg-blue-700 p-3 rounded-xl text-white w-[91.98px]">
                    <button
                      onClick={() => {
                        selectContact(contact.id), handleOpen();
                      }}
                    >
                      <div className="flex space-x-2 items-center text-center">
                        <Edit style={{ fontSize: "15px" }} />
                        <div>Edit</div>
                      </div>
                    </button>
                  </div>
                  <div className="bg-red-700 p-3 rounded-xl text-white">
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="flex space-x-1 items-center"
                    >
                      <Delete style={{ fontSize: "15px" }} />
                      <div>Delete</div>
                    </button>
                  </div>
                </div>

                <EditModal
                  id={selectedContact}
                  handleClose={handleClose}
                  open={selectedContact !== null}
                  name={name}
                  phone={phone}
                  updateContact={updateContact}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-black py-4 text-lg text-center">
            There is no contact available in this list. Please try to add them, thank you!
          </div>
        )}
        <div className="flex items-center justify-center w-full">
          <div className="bg-green-500 items-center py-3 px-10 rounded-xl mt-5 text-center">
            <Link href="/add_contact">Add new contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
