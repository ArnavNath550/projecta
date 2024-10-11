import { API_ENDPOINT } from "@/app/services/api";
import axios, { AxiosError } from "axios";

export const updateIssuePriority = async (issueId: string, issuePriority: string) => {
    try {
      const response = await axios.put(API_ENDPOINT + `/issues/${issueId}`, {
        issue_prioity: issuePriority,
      });   
      return response.data;
    } catch (error: AxiosError) {
      console.error('Error updating issue:', error.response ? error.response.data : error.message);
    }
  };