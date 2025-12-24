import React from 'react'

export default function UserInfoCard() {
    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? "Good Morning" :
            hour < 18 ? "Good Afternoon" :
                "Good Evening";

    return (
        <div>
            <div className="bg-white rounded shadow p-4 mb-4">
                <h2 className="text-lg font-semibold">{greeting} 👋</h2>
                <p className="text-sm text-gray-600">
                    Let’s take today one step at a time.
                </p>
            </div>
        </div>
    )
}
