import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = ({ category }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(`http://localhost:5000/api/news/${category}`);
            setArticles(response.data);
        };
        fetchNews();
    }, [category]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)} News
            </h2>
            <ul className="space-y-4">
                {articles.map((article, idx) => (
                    <li key={idx} className="border p-4 rounded shadow-md flex">
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-1/3 rounded mr-4"
                            />
                        )}
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
        </div>
    );
};

export default News;
