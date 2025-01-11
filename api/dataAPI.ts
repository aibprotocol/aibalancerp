// dataAPI.ts
/**
 * Data API
 * Provides functions to fetch and process data.
 */

import axios from "axios";

export class DataAPI {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            throw error;
        }
    }

    async postData(endpoint: string, payload: Record<string, any>): Promise<any> {
        try {
            const response = await axios.post(`${this.apiUrl}/${endpoint}`, payload);
            return response.data;
        } catch (error) {
            console.error(`Error posting data to ${endpoint}:`, error);
            throw error;
        }
    }
}
