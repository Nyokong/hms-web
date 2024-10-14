import React from 'react';
import { Button } from './ui/button';

export default function createassignment() {
    return (
        <div className="mt-4 mb-4 flex justify-center items-center w-full rounded-[40px]">
            <Button className="h-[50px] w-[170px] rounded-[50px] bg-black">
                Create Assignment
            </Button>
        </div>
    );
}
