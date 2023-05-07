import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

    const sendEmail = (e) => {
      e.preventDefault();

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
  
      emailjs.sendForm('service_k2si4zg', 'template_2q6exjx', e.target, 'PsflA5qIdmDHTJA67')
      .then(() => alert("Form submitted successfully..!!"))
      .catch((error) => alert("Form submission Unsuccessful..!! Kindly try again.."));  
    };

  return (
    <section id="contact" className="relative bg-indigo-100">
      <div className="container bg-blue-200 rounded-lg px-5 py-10 mx-auto flex flex-col items-center justify-center">
        <div className="bg-white md:w-5/6 w-full rounded-lg flex flex-col py-10 shadow-2xl">
        <div className="text-center">
          <i class="fas fa-2x fa-headset inline-block w-10 text-indigo-500" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-black mb-4">
            Contact <span className="text-indigo-600"> Us</span>
          </h1>
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="lg:w-1/2 md:w-1/3 w-full items-center justify-center rounded-lg overflow-hidden md:pl-20 pb-3 pr-0 flex items-end justify-start relative">
            <img class="w-full h-96 rounded-lg" src="../src/assets/contact.jpg" alt="contact" />
          </div>
          <form
            onSubmit={sendEmail}
            className="lg:w-1/3 md:w-1/2 flex flex-col w-full md:py-8 md:ml-20 mt-8 md:mt-0 md:px-0 px-5">
            <div className="relative mb-4">
              <i class="fas fa-md fa-user absolute mt-3 ml-3 text-indigo-600" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autocomplete="off"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-envelope absolute mt-3 ml-3 text-indigo-600" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autocomplete="off"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-phone absolute mt-3 ml-3 text-indigo-600" />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                autocomplete="off"
                pattern="[0-9]{10}"
                className="w-full border-b-2 items-center pl-10 border-gray-700 focus:border-b-indigo-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="relative mb-4">
              <i class="fas fa-md fa-comment-dots absolute mt-3 ml-3 text-indigo-600" />
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                autocomplete="off"
                className="w-full rounded border items-center pl-10 border-gray-700 focus:border-indigo-600 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <button
              type="submit"
              className="text-white items-center bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg">
              Submit
              <i class="fas fa-sm fa-paper-plane ml-3" />
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}
