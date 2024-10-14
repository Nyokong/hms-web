import { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const useDelete = (url: string) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [delErr, setError] = useState(null);

    const deleteItem = async (id: number) => {
        const token = getCookie('access_token');

        setIsDeleting(true);
        try {
            await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsDeleting(false);
        } catch (err) {
            setError(err);
            setIsDeleting(false);
        }
    };

    return { deleteItem, isDeleting, delErr };
};

export default useDelete;
