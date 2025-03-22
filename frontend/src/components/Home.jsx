import React from 'react'

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <button className="bg-blue-200 p-3 text-base hover:bg-blue-300 transition-colors">
                    Instant Meeting
                </button>
            </div>
        </div>
    )
}

export default Home