import { API_ENDPOINT, postDataMethod } from '@/app/services/api';
import axios from 'axios';
import * as React from 'react';

interface LayerProps {
    projectId: string,
    layerId: string,
    layerName: string,
    description: string
}

export const createProjectLayer = async(props: LayerProps) => {
    const response = await axios.post(API_ENDPOINT + '/layers', {
        "projectId": props.projectId,
        "layerId": props.layerId,
        "layerName": props.layerName,
        "layerDescription": props.description
      });
      console.log(`response`, response);
}