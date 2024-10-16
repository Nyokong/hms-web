import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const useSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [grades, setGrades] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            const access_token = getCookie('access_token');

            try {
                const submissionsResponse = await axios.get(
                    'http://localhost:8000/api/submission/list/all',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                setSubmissions(submissionsResponse.data);

                // const gradesResponse = await axios.get(
                //     'http://localhost:8000/api/grades',
                //     // {
                //     //     headers: {
                //     //         Authorization: `Bearer ${access_token}`,
                //     //     },
                //     // },
                // );
                // setGrades(gradesResponse.data);

                // const usersResponse = await axios.get(
                //     'http://localhost:8000/api/usrs/students',
                //     {
                //         headers: {
                //             Authorization: `Bearer ${access_token}`,
                //         },
                //     },
                // );
                // setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSubmissions();
    }, []);

    return { submissions, grades, users };
};

export default useSubmissions;
