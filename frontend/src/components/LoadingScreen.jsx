import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center w-full h-full ">
            <div className="flex flex-col items-center space-y-4">
                {/* DaisyUI Spinner */}
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-lg font-semibold ">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
