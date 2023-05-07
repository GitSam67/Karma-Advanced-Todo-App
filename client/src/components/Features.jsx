import React from "react";

export default function Features() {
  return (
    <section id="features" className="bg-indigo-100 py-5">
      <div className="container bg-white mx-auto flex px-5 md:px-10 py-10 rounded-md flex-col align-items-center">
        <h1 className="title-font font-mono font-black text-3xl mb-10 mt-0 md:text-4xl text-violet-600 text-center">Our Salient Features</h1>
        <div className="lg:flex-grow w-full mb-5 md:mb-20 py-20 rounded-lg flex md:flex-row flex-col bg-blue-100 items-center">
            <div className="md:w-1/2 object-cover md:pl-5 md:px-0 px-5">
                <img className="rounded-lg h-80 shadow-2xl" src="../src/assets/ftr1.jpg" alt="ftr" />
            </div>
          <div className="md:w-1/2 w-full px-10 md:mt-0 mt-10">
            <h1 className="title-font text-3xl md:text-3xl font-bold">Task Organization & Scheduling</h1>
            <p className="title-font text-xl md:text-2xl mt-10 font-sans text-black">
                Helps you with organizing your tasks efficiently by task completion deadlines. So as to keep track of all your tasks & ensure nothing falls through the cracks..!! 
            </p>
          </div>
        </div>

        <div className="lg:flex-grow w-full mb-10 md:mb-20 py-20 rounded-lg flex md:flex-row flex-col items-center">
          <div className="md:w-1/2 w-full px-10 md:mb-0 mb-10">
          <h1 className="title-font text-3xl md:text-3xl font-bold">Reminders & Notifications</h1>
            <p className="title-font text-xl md:text-2xl mt-10 font-sans text-black">
                Reminds you of important tasks & deadlines through notifications & email reminders, to keep you evenly updated with your crucial tasks.
            </p>
          </div>
          <div className="md:w-1/2 w-full object-cover md:pl-8 md:px-0 px-5">
                <img className="rounded-lg h-80 shadow-2xl" src="../src/assets/ftr2.avif" alt="ftr" />
            </div>
        </div>
        <div className="lg:flex-grow w-full mb-5 md:mb-20 py-20 rounded-lg flex md:flex-row flex-col bg-blue-100 items-center">
            <div className="md:w-1/2 w-full object-cover md:pl-10 md:px-0 px-5">
                <img className="rounded-lg h-80 shadow-2xl" src="../src/assets/ftr3.png" alt="ftr" />
            </div>
          <div className="md:w-1/2 w-full px-10 md:mt-0 mt-10">
          <h1 className="title-font text-3xl md:text-3xl font-bold">Performance Tracking</h1>
            <p className="title-font text-xl md:text-2xl mt-10 font-sans text-black">
                Provides you with visual representation of your task completion performance ratio, which eventually builds inner confidence to boast off future tasks..!!
            </p>
          </div>
        </div>
        <div className="lg:flex-grow w-full mb-5 md:mb-0 py-20 rounded-lg flex md:flex-row flex-col items-center">
          <div className="md:w-1/2 w-full px-10 md:mb-0 mb-10">
          <h1 className="title-font text-3xl md:text-3xl font-bold">Simple & Secure</h1>
            <p className="title-font text-xl md:text-2xl mt-10 font-sans text-black">
                Plain & clean app look and feel with your data being Dual token-based authentication secured, powerful security methods implemented to protect your valuable personal data. 
            </p>
          </div>
          <div className="md:w-1/2 w-full object-cover md:pr-5 px-5">
                <img className="rounded-lg h-80 shadow-2xl" src="../src/assets/fttr4.jpg" alt="ftr" />
            </div>
        </div>
      </div>
    </section>
  );
}
