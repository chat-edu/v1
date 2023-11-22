import {NotebookInput} from "@/types/Notebook";

export const addNotebook = async (notebook: NotebookInput) =>
    fetch(`/api/notebooks/create`, {
        method: "POST",
        body: JSON.stringify(notebook),
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);

export const updateNotebook = async (notebookId: string, notebook: NotebookInput) =>
    fetch(`/api/notebooks/${notebookId}/update`, {
        method: "POST",
        body: JSON.stringify(notebook),
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);

export const deleteNotebook = async (notebookId: string) =>
    fetch(`/api/notebooks/${notebookId}/delete`, {
        method: "GET",
    })
        .then(async (res) => {
            return (await res.json()) as boolean
        })
        .then((res) => res);