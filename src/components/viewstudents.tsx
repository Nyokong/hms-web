'use client';

import useVideoData from '@/app/api/useVideoData';
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
// import viewAssignment from '@/app/api/useAssignment';
import ReactPaginate from 'react-paginate';

import {
    // File,
    // Home,
    // LineChart,
    ListFilter,
    MoreHorizontal,
    // Package,
    // Package2,
    // PanelLeft,
    // PlusCircle,
    // Search,
    // Settings,
    // ShoppingCart,
    // Users2,
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

// import { Input } from '@/components/ui/input';

// import { Badge } from '@/components/ui/badge';
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';

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

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from '@/components/ui/popover';
import { Tabs, TabsContent } from './ui/tabs';
import { Label } from './ui/label';
import { getCookie } from 'cookies-next';
import axios from 'axios';

import { User } from '@/types';

export default function viewstudents() {
    // const { videodata, notfound, found, loading, error } = useVideoData();

    const [users, setUsers] = useState<User[]>([]);

    // const [total_count, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    // const [currentId, setCurrentId] = useState(null);

    const rowsPerPage = 10;

    const handlePageClick = event => {
        setCurrentPage(event.selected);
    };

    const access_token = getCookie('access_token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(
                    'http://localhost:8000/api/usrs/students',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    console.log(users);

    // list/assign/
    if (users) {
        const currentRows = users.slice(
            currentPage * rowsPerPage,
            (currentPage + 1) * rowsPerPage,
        );

        return (
            <div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all" className="max-lg:h-auto mt-7">
                        <div className="flex items-center">
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Filter by
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Draft
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Students</CardTitle>
                                    <CardDescription>
                                        View all students
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="hidden w-[100px] sm:table-cell">
                                                    <span className="sr-only">
                                                        Image
                                                    </span>
                                                </TableHead>
                                                <TableHead>username</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Grade</TableHead>
                                                <TableHead>
                                                    <span className="sr-only">
                                                        Actions
                                                    </span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRows.map((user, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {user.username}
                                                    </TableCell>

                                                    <TableCell className="font-medium">
                                                        {user.first_name}
                                                    </TableCell>

                                                    <TableCell className="font-medium">
                                                        {user.last_name}
                                                    </TableCell>

                                                    <TableCell className="font-medium">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Toggle
                                                                        menu
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    grade me
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem
                                                                    // onClick={}
                                                                    className="cursor-pointer"
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                {/* <DropdownMenuItem
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                >
                                                                    {' '}
                                                                    {isDeleting
                                                                        ? 'Deleting...'
                                                                        : 'Delete'}
                                                                </DropdownMenuItem> */}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(
                                            users.length / rowsPerPage,
                                        )}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </CardContent>

                                <CardFooter className="justify-center border-t p-4">
                                    <Label>End</Label>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        );
    }
}
