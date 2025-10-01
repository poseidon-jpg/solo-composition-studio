import { GenerationRequest, GenerationResponse, TrackMetadata } from "@/types";

// Backend URL - configure this via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = {
  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Generation failed: ${response.statusText}`);
    }

    return response.json();
  },

  async remix(request: GenerationRequest): Promise<GenerationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/remix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Remix failed: ${response.statusText}`);
    }

    return response.json();
  },

  async getLibrary(limit: number = 20): Promise<TrackMetadata[]> {
    const response = await fetch(`${API_BASE_URL}/api/library?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch library: ${response.statusText}`);
    }

    return response.json();
  },
};
