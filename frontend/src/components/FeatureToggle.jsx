import React, { useState } from "react";

const FeatureToggle = ({ id }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activate, setActivate] = useState(false);

    const toggleFeature = async () => {
        const response = await fetch(`/api/users/${id}/${activate ? "activate" : "deactivate"}`, { method: "PUT" });
        const data = await response.json();
        console.log("Updated Feature:", data);
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={() => { setActivate(true); setModalOpen(true); }} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Activate
            </button>
            <button onClick={() => { setActivate(false); setModalOpen(true); }} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-4">
                Deactivate
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-lg font-semibold mb-4">{activate ? "Activate Feature?" : "Deactivate Feature?"}</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to proceed?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={toggleFeature} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Yes</button>
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeatureToggle;
