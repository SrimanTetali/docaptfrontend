import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailIcon from "../../images/Home/contact/email.jpeg";
import WhatsappIcon from "../../images/Home/contact/whatsapp.jpeg";
import PhoneIcon from "../../images/Home/contact/phone.jpeg";
import ContactBG from "../../images/Home/contact/Contact.png";
import Footer from "../Home/Footer";

const PContact = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        problem: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/contact", formData);
            toast.success(response.data.message);
            setFormData({ firstname: "", lastname: "", phonenumber: "", email: "", problem: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <>
            <section className="bg-cover bg-center flex justify-end pr-20" style={{ backgroundImage: `url(${ContactBG})` }}>
                <div className="max-w-3xl bg-white bg-opacity-90 p-8 rounded-lg shadow-lg my-12 mr-10">
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">How can We Help You?</h1>
                    <p className="text-center text-gray-700 mb-6">
                        If you are a Patient/Doctor or want to Partner with us. Contact our customer support team for your queries.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        <div className="flex items-center gap-4 my-4">
                            <img src={EmailIcon} alt="Email" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Email us at</p>
                                <a href="mailto:support@goldenlife.in" className="text-blue-600 font-bold">support@goldenlife.in</a>
                            </div>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        <div className="flex items-center gap-4 my-4">
                            <img src={WhatsappIcon} alt="WhatsApp" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">or WhatsApp us at</p>
                                <a href="https://wa.me/919898761234" className="text-blue-600 font-bold">+91 9898761234</a>
                                <p className="text-xs text-gray-600">(Team available 9am - 8pm, Mon - Sun)</p>
                            </div>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        <div className="flex items-center gap-4 my-4">
                            <img src={PhoneIcon} alt="Phone" className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">or Call us at</p>
                                <a href="tel:(011)-4118 3001" className="text-blue-600 font-bold">(011)-4118 3001</a>
                            </div>
                        </div>
                    </div>
                    <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-gray-700">First Name</label>
                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700">Last Name</label>
                                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold text-gray-700">Mobile Number</label>
                                <input type="tel" name="phonenumber" value={formData.phonenumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-700">How can we Help you?</label>
                            <textarea name="problem" value={formData.problem} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-1/2 mx-auto bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Submit</button>
                    </form>
                </div>
            </section>
            <Footer />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default PContact;