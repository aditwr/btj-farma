import React from 'react';
import { Skeleton } from 'antd';

const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-4">
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </div>
        </div>
    );
};

export default Loading;