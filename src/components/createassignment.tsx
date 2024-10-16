'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns/format';
import { formatISO } from 'date-fns';

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
        status: '',
        due_date: '',
    });
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [status, setStatus] = useState(formData.status);

    const times = ['09:00', '12:00', '15:00', '18:00', '23:55'];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = date => {
        const formattedDate = formatISO(new Date(date));
        setFormData(prevData => ({
            ...prevData,
            due_date: formattedDate,
        }));
        console.log('Formatted Due Date:', formattedDate);
    };

    const handleStatusChange = value => {
        setStatus(value);
        setFormData(prevData => ({
            ...prevData,
            status: value,
        }));
    };

    const handleDateSelect = date => {
        setSelectedDate(date);
        setSelectedTime('');
        const formattedDate = formatISO(new Date(date.setHours(23, 55)));
        setFormData(prevData => ({
            ...prevData,
            due_date: formattedDate,
        }));
        console.log('Formatted Due Date:', formattedDate);
    };

    const handleTimeSelect = (time: React.SetStateAction<string>) => {
        setSelectedTime(time);
        const [hours, minutes] = time.split(':');
        const fullDateTime = new Date(selectedDate);
        fullDateTime.setHours(hours);
        fullDateTime.setMinutes(minutes);
        const formattedDateTime = formatISO(fullDateTime, {
            representation: 'complete',
        });

        setFormData(prevData => ({
            ...prevData,
            due_date: formattedDateTime,
        }));
        console.log('Formatted Due Date:', formattedDateTime);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('access_token');

        // Validate due date
        // if (moment(formData.due_date).isAfter(moment())) {
        //     setError('Due date must be in the future');
        //     return;
        // }

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
                console.log(formData.status);
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
                status: '',
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
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
            >
                <Input
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
                {/* <Select>
                    <SelectTrigger
                        name="status"
                        value={formData.status}
                        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent onChange={handleChange}>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select> */}
                {/* <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select> */}
                <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger
                        name="status"
                        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="datetime-local"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* <div className="flex flex-row h-auto w-auto p-2 justify-center items-center bg-slate-100 rounded-lg"> */}
                {/* <Label>Select Date</Label> */}
                {/* <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                    />
                    <div className="flex flex-col mr-4">
                        {times.map(time => (
                            <button
                                key={time}
                                className={`m-1 p-2 border ${time === selectedTime ? 'bg-blue-500 text-white' : ''}`}
                                onClick={event => {
                                    event.preventDefault();
                                    handleTimeSelect(time);
                                }}
                            >
                                {time}
                            </button>
                        ))}
                    </div> */}
                {/* </div> */}

                <Button
                    type="submit"
                    size="sm"
                    className="text-black gap-1 h-14 w-28 flex flex-row justify-center items-center"
                >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className=" text-[13px] text-black">
                        Add Assignment
                    </span>
                </Button>
            </form>
        </div>
    );
};

export default CreateAssignment;
