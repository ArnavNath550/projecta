import axios from 'axios'
import * as React from 'react'
import { API_ENDPOINT } from './api'

export const serviceFetchProjectDetails = async(id: any) => {
    const res = await axios.get(API_ENDPOINT + "/projects/"+id);
    const data = res.data;

    return data;
}