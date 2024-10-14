import React, { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusCircle } from 'lucide-react';

interface Assignment {
    title: string;
    description: string;
    attachment: string;
    status: string;
}

const CreateAssignment = () => {
    const [error, setError] = useState('');
    const userInfo = JSON.parse(getCookie('user_data') || '{}');
    const [formData, setFormData] = useState<Assignment>({
        title: '',
        description: '',
        attachment: '',
        status: 'draft',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('access_token');

        try {
            await axios.post(
                'http://127.0.0.1:8000/api/assign/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setFormData({
                title: '',
                description: '',
                attachment: '',
                status: 'draft',
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response
                        ? error.response.data.error
                        : 'Unexpected error',
                );
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className="mt-4 mb-4 flex flex-col justify-center items-center w-full rounded-[40px]">
            <h1>Create Assignment</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a title:"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a description:"
                />
                <Input
                    type="text"
                    name="attachment"
                    value={formData.attachment}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Attachment URL"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                </select>

                <Button
                    type="submit"
                    size="sm"
                    className="text-black gap-1 h-14 w-28"
                >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[13px] text-black sm:text-black">
                        Add Assignment
                    </span>
                </Button>
            </form>
        </div>
    );
};

export default CreateAssignment;
