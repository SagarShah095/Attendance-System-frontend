import React from 'react';

const Loader = ({ fullScreen = false }) => {
    const loaderClasses = "animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-primary/20";

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className={loaderClasses}></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className={loaderClasses}></div>
        </div>
    );
};

export default Loader;
