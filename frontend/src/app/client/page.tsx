'use client'
import React from 'react';
import { API_ENDPOINT } from '../services/api';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function Client() {
    const { data: session } = useSession();

    // Route user to respective page
    const fetchRespectivePage = async () => {
        try {
            const res = await axios.get(API_ENDPOINT + "/projects/user/" + session?.user.id);
            const data = res.data;
            if (data.length > 0) {
                // Extract the first project's projectId
                const firstProjectId = data[0].projectId;
                // Route to /client/[projectId]/tasks
                window.location.href = `/client/${firstProjectId}/tasks`;
            } else {
                // If no projects found, redirect to the create page
                window.location.href = "/client/create/";
            }
        } catch (error) {
            console.error('Error fetching user projects:', error);
            // Optionally handle error (e.g., display a message)
        }
    };

    React.useEffect(() => {
        if (session?.user.id) {
            fetchRespectivePage();
        }
    }, [session?.user.id]);

    return <div></div>;
}

export default Client;
