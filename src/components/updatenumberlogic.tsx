import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// import for cookies
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

function updatenumberlogic() {
    const [studentNumber, setStudentNumber] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(
                'http://localhost:8000/api/usr/update-std-number',
                {
                    student_number: studentNumber,
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                },
            );
            console.log('Student number updated:', response.data);
        } catch (error) {
            console.error('Error updating student number:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <Label>Please add your student number Here:</Label>
            <Input
                type="text"
                value={studentNumber}
                onChange={e => setStudentNumber(e.target.value)}
                placeholder="Enter new student number"
            />
            <Button
                onClick={handleUpdate}
                className="bg-green-500 text-white h-14 w-28"
                type="submit"
            >
                Update Student Number
            </Button>
        </div>
    );
}

export default updatenumberlogic;
