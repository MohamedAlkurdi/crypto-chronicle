export default function Contact() {
    return(
        <div id="contact" className="relative flex items-top justify-center min-h-screen bg-mainBG -mt-36 pb-36 sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 mr-2 bg-main  sm:rounded-lg flex flex-col justify-around">
                            <div className="leftTopPart">
                            <h1 className="text-4xl sm:text-5xl text-mainBG font-extrabold tracking-tight">
                                Get in touch
                            </h1>
                            <p className="text-normal text-lg sm:text-2xl font-medium text-secondary mt-2">
                                Fill in the form to start a conversation
                            </p>
                            </div>
                            <div className="leftBottomPart">

                            <div className="flex items-center mt-4 text-mainBG">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-full">
                                    +00 000 000 00
                                </div>
                            </div>

                            <div className="flex items-center mt-2 text-mainBG ">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div className="ml-4 w-full text-md tracking-wide font-semibold">
                                    <a target="blank" href="https://www.linkedin.com/in/mohamed-alkurdi-5b97b3243/">Click here to reach us.</a>
                                </div>
                            </div>
                        </div>
                        </div>

                        <form action="https://fabform.io/f/xxxxx" method="post" className="p-6 flex flex-col justify-center">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="hidden">Full Name</label>
                                <input type="name" name="name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-main  border border-gray-400 text-mainBG font-semibold focus:outline-none"/>
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="hidden">Email</label>
                                <input type="email" name="email" id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-main  border border-gray-400 text-mainBG font-semibold focus:outline-none"/>
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="message" className="hidden">Message</label>
                                <textarea name="message" id="message" placeholder="Your Message" className="w-100 mt-2 py-3 px-3 rounded-lg bg-main  border border-gray-400 text-mainBG font-semibold focus:outline-none"></textarea>
                            </div>

                            <button type="submit" className="md:w-32 bg-secondary hover:lightMain text-main font-bold py-3 px-6 rounded-lg mt-3 hover:bg-darkSecondary transition ease-in-out duration-300">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

