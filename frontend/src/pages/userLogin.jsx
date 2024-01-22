import React from "react"
import Navbar from "../components/Navbar";


const BackButton = () => {
    history.back()
};


function UserLogin() {
    return (
        <div>
            <Navbar />
            <div className="mt-72 text-center text-5xl ">
                <h1 className="mb-7">COMING</h1>
                <h2 className="mb-7">SOON</h2>
            </div>
            <div>
                <button type="button" onClick={BackButton}
                    className='m-auto bg-[#36311F] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#36311F] transition-all duration-300 text-lg text-2xl '
                    >Back</button>
            </div>
        </div>
    )
}

export default UserLogin