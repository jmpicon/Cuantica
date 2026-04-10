import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Progress ──────────────────────────────────────────────────────────────────
export const progressApi = {
  getSummary: (userId: number) => api.get(`/progress/${userId}/summary`),
  getWeek: (userId: number, week: number) =>
    api.get(`/progress/${userId}/week/${week}`),
  update: (
    userId: number,
    payload: {
      week_number: number;
      item_type: string;
      item_key: string;
      completed: boolean;
      score?: number;
      notes?: string;
    }
  ) => api.post(`/progress/${userId}/update`, payload),
};

// ── Documents ─────────────────────────────────────────────────────────────────
export const docsApi = {
  list: (userId: number) => api.get(`/documents/${userId}`),
  upload: (userId: number, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api.post(`/documents/${userId}/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  remove: (userId: number, docId: number) =>
    api.delete(`/documents/${userId}/${docId}`),
  query: (userId: number, docId: number, pregunta: string) =>
    api.post(`/documents/${userId}/${docId}/query`, { pregunta }),
};

// ── Podcasts ──────────────────────────────────────────────────────────────────
export const podcastsApi = {
  list: (userId: number) => api.get(`/podcasts/${userId}`),
  generate: (
    userId: number,
    payload: {
      titulo: string;
      documento_id?: number;
      tema?: string;
      estilo: string;
      duracion_minutos: number;
    }
  ) => api.post(`/podcasts/${userId}/generate`, payload),
  remove: (userId: number, podcastId: number) =>
    api.delete(`/podcasts/${userId}/${podcastId}`),
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post(
      "/auth/login",
      new URLSearchParams({ username: email, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    ),
  register: (email: string, username: string, password: string) =>
    api.post("/auth/register", { email, username, password }),
};
