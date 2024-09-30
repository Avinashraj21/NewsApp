import React from 'react';
import News from './components/News';
import Subscription from './components/Subscription';

const App = () => {
    const categories = ['business', 'entertainment', 'health', 'science', 'sports'];

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-4xl font-bold mb-6">News Application</h1>
            <Subscription />
            <div className="grid grid-cols-1 gap-6 mt-6">
                {categories.map(category => (
                    <News key={category} category={category} />
                ))}
            </div>
        </div>
    );
};

export default App;
