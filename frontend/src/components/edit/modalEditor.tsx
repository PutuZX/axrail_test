import React, { useEffect, useState } from "react";

const ModalEditor: React.FC<{
  id: any;
  name: string;
  phone: string;
  handleClose: () => void;
  updateContact: (id: any, name: string, phone: string) => void;
}> = ({ id, name, phone, updateContact, handleClose }) => {
  const [newName, setName] = useState("");
  const [newPhone, setPhone] = useState("");

  useEffect(() => {
    setName(name);
    setPhone(phone);
  }, [name, phone]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-[#656ED3] h-12 rounded-xl p-4 text-center"
          placeholder="Input your name"
        />
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Input your phone number"
          className="border-2 border-[#656ED3] h-12 rounded-xl p-4 text-center"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <button
          onClick={() => {
            updateContact(id, newName, newPhone), handleClose();
          }}
          className="bg-green-500 w-fit text-white py-2 px-12 rounded-xl"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalEditor;
