import { useState } from 'react';

export default function FAQ() {
    const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    const questions = [
        { question: 'What is a cryptocurrency?', answer: 'A cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates independently of a central bank and can be used for various transactions online. Popular examples include Bitcoin, Ethereum, and Litecoin.' },
        { question: 'What is an NFT?', answer: 'NFT stands for Non-Fungible Token. Unlike cryptocurrencies, which are identical and can be exchanged one-for-one, NFTs are unique digital assets that represent ownership of a specific item or piece of content, such as digital art, music, or virtual real estate.' },
        { question: 'What are cryptocurrency exchanges?', answer: 'Cryptocurrency exchanges are platforms where you can buy, sell, and trade cryptocurrencies. Our app provides insights into the top exchanges, detailing their features, fees, and supported cryptocurrencies to help you choose the best platform for your trading needs.' },
        { question: 'How can I explore different cryptocurrencies on the app?', answer: 'Our app provides a comprehensive list of cryptocurrencies, complete with detailed information about each one. You can browse through the list to discover various coins, learn about their market value, and understand their unique features.' },
    ];

    return (
        <section className='bg-mainBG'>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto ">
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleQuestion(index)}
                        >
                            <button
                                type="button"
                                className="flex items-center justify-between w-full px-4 py-5 sm:p-6 bg-main text-secondary"
                            >
                                <span className="flex text-lg font-semibold text-secondary">
                                    {item.question}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className={`w-6 h-6 transform transition-transform duration-200 ${openQuestionIndex === index ? 'rotate-180' : ''}`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {openQuestionIndex === index && (
                                <div className="px-4 pb-5 sm:px-6 sm:pb-6 bg-main text-mainBG">
                                    <p>
                                        {item.answer}{' '}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-600 text-base mt-9">
                    Didn’t find the answer you are looking for?{' '}
                    <a
                        href="#contact"
                        title=""
                        className="font-medium text-main transition-all duration-200  hover:underline"
                    >
                        Reach our support
                    </a>
                </p>
            </div>
        </section>
    );
}
