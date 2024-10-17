import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkeletonLoader = () => {
    return (
        <div className="border p-4 rounded shadow-md flex flex-col">
            <div className="h-48 bg-gray-200 animate-pulse mb-2 rounded"></div>
            <div className="flex-1">
                <div className="h-4 bg-gray-200 animate-pulse mb-2 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 animate-pulse mb-2 rounded w-full"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded w-5/6"></div>
            </div>
        </div>
    );
};

const News = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(6);
    const [loading, setLoading] = useState(false); // Loader state for fetching articles
    const [loadingCard, setLoadingCard] = useState(null); // Loader state for specific card

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // https://newsapp-dohg.onrender.com/
                const response = await axios.get(`https://newsapp-dohg.onrender.com/api/news/${category}`);
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [category]);

    const placeholderImage = 'https://via.placeholder.com/300x180?text=Image+Not+Available';

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCardClick = (articleIdx) => {
        setLoadingCard(articleIdx); // Start loading for the specific card
        // Simulate a loading delay, e.g., fetching more details
        setTimeout(() => {
            setLoadingCard(null); // Stop loading after a delay
            // Here you can add your logic to navigate to the article details or fetch more data
        }, 2000); // Simulated loading time
    };

    console.log("currentArticles: ",currentArticles)

    return (
        <div className='w-full my-5'>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: articlesPerPage }).map((_, idx) => (
                        <SkeletonLoader key={idx} />
                    ))}
                </div>
            ) : (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentArticles.map((article, idx) => (
                            <li key={idx} className="border p-4 rounded shadow-md flex flex-col">
                                <div onClick={() => handleCardClick(idx)} className="relative cursor-pointer">
                                    {loadingCard === idx ? (
                                        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded">
                                            <SkeletonLoader />
                                        </div>
                                    ) : article.urlToImage ? (
                                        <img
                                            src={article.urlToImage}
                                            alt={article.title}
                                            className="w-full h-48 object-cover rounded mb-2"
                                        />
                                    ) : (
                                        <div className="relative w-full h-48 mb-2">
                                            <img
                                                src={placeholderImage}
                                                alt="Image Not Available"
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-semibold"
                                    >
                                        {article.title}
                                    </a>
                                    <p className="text-gray-600 mt-2">{article.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="flex justify-between my-5">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="mt-2 text-center">
                        Page {currentPage} of {totalPages}
                    </div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                   
                </>
            )}
        </div>
    );
};

export default News;
