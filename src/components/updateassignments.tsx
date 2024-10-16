import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';
import { error } from 'console';
import Createassignment from './createassignment';

import { useRouter } from 'next/navigation';

import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    X,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from './ui/textarea';
import { getCookie } from 'cookies-next';

export default function updateassignments({ id }: any) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        status: '',
        attachment: '',
    });

    const userdata = getCookie('user_data');
    const userid = JSON.parse(userdata);
    const [status, setStatus] = useState(formData.status);

    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/assign/update/${id}/${userid.id}`)
            .then(response => {
                const assignmentData = response.data[0]; // Access the first element of the array
                const { title, description, due_date, status, attachment } =
                    assignmentData;
                setFormData({
                    title,
                    description,
                    due_date: new Date(due_date).toISOString().substring(0, 16), // Formats for input[type="datetime-local"]
                    status,
                    attachment: attachment ? attachment : '',
                });
            })
            .catch(error => setError('Error fetching assignment data'));
    }, [id, userid.id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStatusChange = value => {
        setStatus(value);
        setFormData(prevData => ({
            ...prevData,
            status: value,
        }));
        console.log('Status changed to:', value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => {
            formDataObj.append(key, formData[key]);
        });
        try {
            const response = await axios.put(
                `http://localhost:8000/api/assign/update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            console.log('Assignment updated:', response.data);
            router.push(`/dashboard/${userid.id}`);
        } catch (error) {
            setError('Error updating assignment');
        }
    };

    // const { data: assignmentData, refetch } = useAssignments();
    // list/assign/
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Input
                type="datetime-local"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* <Input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                /> */}
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
                    <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
            </Select>
            <Input
                type="file"
                name="attachment"
                onChange={e =>
                    setFormData(prevData => ({
                        ...prevData,
                        attachment: e.target.attachment[0],
                    }))
                }
                className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-3 rounded"
            >
                Update Assignment
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
