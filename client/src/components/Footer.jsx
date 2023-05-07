import React from "react";

export default function Footer() {
    return (
        <section id="footer" className="bg-blue-100">
            <div className="container md:px-5 pt-5 py-2 mx-auto">
                <div className="flex flex-col sm:flex-row">
                <div className="md:w-1/3 items-center text-center mx-auto">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font text-black mb-5"><span className="text-black font-sans">Karma</span></h2>
                    <h6 className="text-center text-black mb-10 px-7">Thank you for visiting our site. Connect with us over socials. <br /><p className="my-5 font-sans font-semibold text-lg text-purple-900">||* Karmasya parmo dharma *||</p></h6>
                </div>

                <div className="md:w-1/3 items-center text-center mx-auto">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font md:mr-10 text-black mb-4"><i class="fas fa-chevron-right mr-2"></i>Quick page links</h2>
                    <div id="quick" className="flex flex-col text-left md:ml-16 mb-10">
                    <a className="transition delay-40 title-font font-medium text-black py-2 w-fit hover:text-purple-600 duration-300" href="#home"><i class="fas fa-chevron-circle-right"></i> home</a>
                    <a className="transition delay-40 title-font font-medium text-black py-2 w-fit hover:text-purple-600 duration-300" href="#features"><i class="fas fa-chevron-circle-right"></i> features</a>
                    <a className="transition delay-40 title-font font-medium text-black py-2 w-fit hover:text-purple-600 duration-300" href="#contact"><i class="fas fa-chevron-circle-right"></i> contact us</a>
                    </div>
                </div>

                <div class="md:w-1/3 items-center text-black mx-auto">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font text-black mb-4">Contact info</h2>
                    <p className="py-1"> <i class="fas fa-phone text-black mr-2"></i><a href="tel:+91 937-582-9419">+91 937-582-9419</a></p>
                    <p className="py-1"> <i class="fas fa-envelope text-black mr-2 "></i><a href="mailto:samanuaynr67@gmail.com">karma.web.pvt.ltd@gmail.com</a></p>
                    <div id="social" class="flex flex-wrap">
                    <a className="transition delay-40 rounded-xl h-4 w-4 text-center m-4 mt-2 ml-0 text-black hover:text-purple-600 duration-400" href="https://www.linkedin.com/in/samanuay-nambiar-31852b233/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> </a>
                    <a className="transition delay-40 rounded-xl h-4 w-4 text-center m-4 mt-2 ml-0 text-black hover:text-purple-600 duration-400" href="https://github.com/GitSam67" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> </a>
                    <a className="transition delay-40 rounded-xl h-4 w-4 text-center m-4 mt-2 ml-0 text-black hover:text-purple-600 duration-400" href="mailto:samanuaynr67@gmail.com" target="_blank" rel="noopener noreferrer"><i class="fas fa-envelope"></i> </a>
                    <a className="transition delay-40 rounded-xl h-4 w-4 text-center m-4 mt-2 ml-0 text-black hover:text-purple-600 duration-400" href="https://twitter.com/SamanuayN" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i> </a>
                    <a className="transition delay-40 rounded-xl h-4 w-4 text-center m-4 mt-2 ml-0 text-black hover:text-purple-600 duration-400" href="https://dev.to/devsam67" target="_blank" rel="noopener noreferrer"><i class="fab fa-dev"></i> </a>
                    </div>
                </div>
                </div>
            </div>

            <h1 class="w-10/12 mx-auto py-2 text-center text-black title-font font-medium border-t-2 border-gray-600">Copyright © 2023 Karma Pvt. Ltd. • All rights reserved.</h1>

        </section>

    )
}