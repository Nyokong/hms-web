import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface Assignment {
    id: number;
    title: string;
    description: string;
    attachment: string;
    status: string;
    total_submissions: number;
    created_at: string;
    created_by: number;
}

interface AssignmentState {
    assignmentData: Assignment | null;
    a_notfound: boolean;
    a_found: boolean;
    a_loading: boolean;
    a_error: string | null;
    a_length: number;
}

const useAssignments = () => {
    const [assignmentState, setAssignmentState] = useState<AssignmentState>({
        assignmentData: null,
        a_notfound: false,
        a_found: true,
        a_loading: true,
        a_error: null,
        a_length: 0,
    });

    // get the logged in user

    const fetchAssignmentData = async () => {
        const userData = getCookie('user_data');
        const parsed = JSON.parse(userData);

        // console.log(parsed);
        // Retrieving data
        const assignmentData = localStorage.getItem('assignment_data');
        // {"id":2,"username":"music","first_name":"Callmekay","email":"mikewolfnyokong@gmail.com","student_number":"31499677"}'
        console.log(`Assignment Data: ${assignmentData}`);

        if (assignmentData != null) {
            setAssignmentState({
                assignmentData: JSON.parse(assignmentData),
                a_notfound: false,
                a_found: true,
                a_loading: false,
                a_error: null,
                a_length: JSON.parse(assignmentData).length,
            });
            return;
        } else {
            try {
                if (parsed) {
                    console.log(`get user with id: ${parsed.id}`);
                    const response = await axios.get<Assignment>(
                        `http://localhost:8000/api/assign/view/${parsed.id}`,
                    );
                    if (response.data) {
                        setAssignmentState({
                            assignmentData: response.data,
                            a_notfound: false,
                            a_found: true,
                            a_loading: false,
                            a_error: null,
                            a_length: response.data.length,
                        });
                    } else {
                        setAssignmentState({
                            assignmentData: null,
                            a_notfound: true,
                            a_found: false,
                            a_loading: true,
                            a_error: 'no assignments',
                            a_length: 0,
                        });
                    }
                    // set localstorage data
                    localStorage.setItem(
                        'assignments_data',
                        JSON.stringify(response.data),
                    );
                } else {
                    setAssignmentState({
                        assignmentData: null,
                        a_notfound: true,
                        a_found: false,
                        a_loading: false,
                        a_error: 'assignment not found',
                        a_length: 0,
                    });
                }
            } catch (error: any) {
                setAssignmentState({
                    assignmentData: null,
                    a_notfound: true,
                    a_found: false,
                    a_loading: false,
                    a_error: error.message || 'Error fetching video data',
                    a_length: 0,
                });
            }
        }
    };

    useEffect(() => {
        fetchAssignmentData();
    }, []);

    return assignmentState;
};

export default useAssignments;
