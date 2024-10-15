'use client';

import React, { useState } from 'react';
import axios from 'axios';

// extra
import { getCookie } from 'cookies-next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusCircle } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';

// import { DatePicker, TimePicker } from '@shadcn/ui';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Textarea } from './ui/textarea';

import moment from 'moment';

interface Assignment {
    title: string;
    description: string;
    attachment: string;
    status: string;
    due_date: string;
}

const CreateAssignment = () => {
    const [error, setError] = useState('');
    const userInfo = JSON.parse(getCookie('user_data') || '{}');
    const [formData, setFormData] = useState<Assignment>({
        title: '',
        description: '',
        attachment: '',
        status: 'draft',
        due_date: '',
    });
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date) => {
        setFormData(prevData => ({
            ...prevData,
            due_date: date.toISOString(), // Store date in ISO format
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('access_token');

        // Validate due date
        if (!moment(formData.due_date).isAfter(moment())) {
            setError('Due date must be in the future');
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/assign/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.status === 201) {
                // Refetch assignments data
                // document
                //     .getElementById('refreshButton')
                //     .addEventListener('click', function () {
                //         location.reload();
                //     });
            }
            setFormData({
                title: '',
                description: '',
                attachment: '',
                status: 'draft',
                due_date: '', // Reset due_date
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
                {/* <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a title:"
                />
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a description:"
                />
                <Input
                    type="file"
                    name="attachment"
                    value={formData.attachment}
                    onChange={handleChange}
                    className="m-2 border flex justify-start items-center border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Attachment URL"
                />
                <Select>
                    <SelectTrigger
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Active</SelectItem>
                        <SelectItem value="dark">Draft</SelectItem>
                    </SelectContent>
                </Select> */}

                <Popover>
                    <PopoverTrigger className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Open
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>

                {/* <Button
                    type="submit"
                    size="sm"
                    className="text-black gap-1 h-14 w-28"
                >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className=" text-[13px] text-black">
                        Add Assignment
                    </span>
                </Button> */}
            </form>
        </div>
    );
};

export default CreateAssignment;
