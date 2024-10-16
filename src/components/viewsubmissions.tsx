'use client';

import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';
import ReactPaginate from 'react-paginate';

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

import { Tabs, TabsContent } from './ui/tabs';
import { Label } from './ui/label';
import { getCookie } from 'cookies-next';
import axios from 'axios';

import { User } from '@/types';
import useSubmissions from '@/app/api/useSubmission';

import Updatesubmission from '@/components/updatesubmission';
import Viewonevideo from './viewonevideo';

export default function viewsubmissions() {
    const [total_count, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(null);

    const [submissions, setSubmissions] = useState([]);
    const [grades, setGrades] = useState([]);
    const [users, setUsers] = useState([]);
    const [marked, setMarked] = useState(false);

    const [isPopUpVideo, setIsPopupOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [asignment_id, setAssignmentID] = useState(null);
    const [a_student_id, setStudentID] = useState(null);
    const [a_videoid, setVideoID] = useState(null);

    const rowsPerPage = 10;

    const handlePageClick = event => {
        setCurrentPage(event.selected);
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            const access_token = getCookie('access_token');
            try {
                // Add headers for the first request if needed
                const submissionsResponse = await axios.get(
                    'http://localhost:8000/api/submission/list/all',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                const usersResponse = await axios.get(
                    'http://localhost:8000/api/usrs/students',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );

                const submissions = submissionsResponse.data;
                const users = usersResponse.data;

                // Check if any submission is unmarked
                const anyUnmarked = submissions.some(
                    submission => !submission.marked,
                );

                setSubmissions(submissions);
                setGrades(grades); // Make sure 'grades' is defined or fetched
                setUsers(users);
                setMarked(anyUnmarked); // Update the marked state based on submissions
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSubmissions();
    }, []);

    const formatDate = dateString => {
        return new Date(dateString).toLocaleString();
    };

    const handleOpenOverlay = (
        id: React.SetStateAction<null>,
        student_id: React.SetStateAction<null>,
    ) => {
        setAssignmentID(id);
        setStudentID(student_id);
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setAssignmentID(null);
        setStudentID(null);
    };

    const handlevideoOpen = id => {
        setVideoID(id);
        setIsPopupOpen(true);
    };

    const handlevideoClose = () => {
        setIsPopupOpen(false);
        setVideoID(null);
    };

    const access_token = getCookie('access_token');

    console.log(submissions);
    console.log(users);

    // list/assign/
    if (submissions) {
        const currentRows = submissions.slice(
            currentPage * rowsPerPage,
            (currentPage + 1) * rowsPerPage,
        );

        return (
            <div>
                {isOverlayOpen && (
                    <div className="relative w-full">
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black w-full">
                            <div className="bg-white p-8 rounded shadow-lg relative sm:w-[400px] sm:mx-[5%]">
                                <button
                                    onClick={handleCloseOverlay}
                                    className="absolute top-2 right-2"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <Updatesubmission
                                    id={asignment_id}
                                    student_id={a_student_id}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {isPopUpVideo && (
                    <div className="relative w-full">
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black w-full">
                            <div className="bg-white p-8 rounded shadow-lg relative sm:w-auto sm:mx-[5%] flex justify-center items-center">
                                <button
                                    onClick={handlevideoClose}
                                    className="absolute top-2 right-2"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <Viewonevideo id={a_videoid} />
                            </div>
                        </div>
                    </div>
                )}
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
                                    <CardTitle>Submissions</CardTitle>
                                    <CardDescription>
                                        View all Submissions and Grade
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
                                                <TableHead>Student</TableHead>
                                                <TableHead>
                                                    Assignment
                                                </TableHead>
                                                <TableHead>Video</TableHead>
                                                <TableHead>Grade</TableHead>
                                                <TableHead>
                                                    Letter Grade
                                                </TableHead>
                                                <TableHead>
                                                    Submission at
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">
                                                        Actions
                                                    </span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRows.map((sub, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {sub.student}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {sub.assignment}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <Button
                                                            className="mx-2 bg-black text-white"
                                                            onClick={() =>
                                                                handlevideoOpen(
                                                                    sub.video,
                                                                )
                                                            }
                                                        >
                                                            watch
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {sub.marked
                                                            ? sub.grade
                                                            : 'None'}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {sub.marked
                                                            ? sub.letter_grade
                                                            : 'None'}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {formatDate(
                                                            sub.submitted_at,
                                                        )}
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
                                                                    onClick={() =>
                                                                        handleOpenOverlay(
                                                                            sub.id,
                                                                            sub.student,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
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
                                            submissions.length / rowsPerPage,
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
