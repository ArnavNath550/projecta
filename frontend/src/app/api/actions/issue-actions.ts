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

export interface Tag {
  tag_name: string;
  tag_colour: string;
  tag_id: string;
  tag_creator: string;
  project_id: string;
}

export const createIssueTag = async (tag: Tag) => {
  try {
    const response = await axios.post(API_ENDPOINT + "/tags", {
      tag_name: tag.tag_name,
      tag_colour: tag.tag_colour,
      tag_id: tag.tag_id,
      tag_creator: tag.tag_creator,
      project_id: tag.project_id,
    });

    console.log('Tag created successfully:', response.data);
  } catch (error) {
    console.error('Error creating tag:', error);
  }
};