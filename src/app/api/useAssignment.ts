import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface Assignment {
    id: number;
    title: string;
    description: string;
    created_by: number;
}

interface AssignmentState {
    assignmentData: Assignment | null;
    a_notfound: boolean;
    a_found: boolean;
    a_loading: boolean;
    a_error: string | null;
}

const useAssignments = () => {
    const [assignmentState, setAssignmentState] = useState<AssignmentState>({
        assignmentData: null,
        a_notfound: false,
        a_found: true,
        a_loading: true,
        a_error: null,
    });

    const fetchAssignmentData = async () => {
        const userData = getCookie('user_data');
        const parsed = JSON.parse(userData);
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
            });
            return;
        }

        try {
            if (parsed) {
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
                    });

                    console.log(response.data);
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
                    a_error: 'Video not found',
                });
            }
        } catch (error: any) {
            setAssignmentState({
                assignmentData: null,
                a_notfound: true,
                a_found: false,
                a_loading: false,
                a_error: error.message || 'Error fetching video data',
            });
        }
    };

    useEffect(() => {
        fetchAssignmentData();
    }, []);

    return assignmentState;
};

export default useAssignments;
