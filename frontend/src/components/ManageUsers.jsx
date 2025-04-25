"use client"

import { useState } from "react"

const ManageUsers = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleAction = async (action) => {
    setIsLoading(true)
    setMessage({ text: "", type: "" })

    try {
      const response = await fetch(`/api/users/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: data.message || "Action successful",
          type: "success",
        });

        // Show a popup for deactivation
        if (action === "deactivate") {
          alert("Account has been deactivated successfully!");
        }
    
      } else {
        setMessage({
          text: data.error || "Action failed",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "An error occurred", type: "error" });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-150"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Actions"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 py-1 border border-gray-700">
          {message.text && (
            <div
              className={`px-4 py-2 text-sm ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            onClick={() => handleAction("activate")}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Activate Account
          </button>

          <button
            onClick={() => handleAction("deactivate")}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Deactivate Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers
