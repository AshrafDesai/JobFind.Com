// hooks/useGetAllJobs.jsx
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const searchedQuery = useSelector(store => store.job?.searchedQuery || '');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null); 
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                
                if (response.data && response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                } else {
                    setError(response.data.message || 'Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]); 

    return { loading, error };
};

export default useGetAllJobs;
