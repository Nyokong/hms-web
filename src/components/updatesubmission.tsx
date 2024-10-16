import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const updatesubmission = ({ id, student_id }: any) => {
    const [formData, setFormData] = useState({
        grade: '',
        marked: false,
        // other fields if needed
    });
    const [error, setError] = useState(null);
    const access_token = getCookie('access_token');

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/submission/list/${id}/${student_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                setFormData(response.data[0]); // Assuming the API returns an array
            } catch (error) {
                console.error('Error fetching submission:', error);
                setError('Error fetching submission.');
            }
        };

        fetchSubmission();
    }, [id, student_id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/api/submission/list/${id}/${student_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            alert('Submission updated successfully!');
        } catch (error) {
            console.error('Error updating submission:', error);
            setError('Error updating submission.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <Label htmlFor="grade">Grade</Label>
            <Input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="Enter grade"
            />
            <Label htmlFor="marked">Marked</Label>
            <Input
                type="checkbox"
                name="marked"
                checked={formData.marked}
                onChange={e =>
                    setFormData(prevData => ({
                        ...prevData,
                        marked: e.target.checked,
                    }))
                }
            />
            <Button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-3 rounded"
            >
                Update Submission
            </Button>
        </form>
    );
};

export default updatesubmission;
