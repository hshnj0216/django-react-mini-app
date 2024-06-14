"use client"
import Link from "next/link";
import useAuth from "./custom_hooks/useAuth";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import PopUpForm from "./components/PopUpForm";
import api from "./api";

interface FormData{
	title: string;
	content: string;
}

interface Note {
    id: number;
    title: string;
    content: string;
}

export default function Home() {
	const { isLoggedIn } = useAuth();
	const [notes, setNotes] = useState<Note[]>([]);
	const [showForm, setShowForm] = useState(false);

	// Fetches all notes belonging to the user
    const fetchNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
        } catch (error) {
            console.log("There was an error fetching the notes.");
        }
    };

    // Fetch notes when the component mounts or when the user logs in
    useEffect(() => {
        if (isLoggedIn) {
            fetchNotes();
        }
    }, [isLoggedIn]);

    // Shows the pop up form
    const addNote = () => {
        setShowForm(true);
    };

    const onSubmit = async (formData: FormData) => {
        try {
            await api.post("/api/notes/", formData);
            setShowForm(false);
            fetchNotes(); // Refetch notes after adding a new one
        } catch (error) {
            console.log("There was an error submitting the note.");
        }
    };

    const onDelete = async (id: number) => {
        try {
            await api.delete(`/api/note/delete/${id}/`);
            fetchNotes(); // Refetch notes after deleting one
        } catch (error) {
            console.log("There was an error deleting the note.");
        }
    };

    const onClose = () => {
        setShowForm(false);
    };

	return (
		<>
			{isLoggedIn ? (
				<div className="flex flex-col w-full h-full">
					{!(notes.length > 0) && (<h4 className="text-3xl m-5">You have no notes, click "Add Note" to create one.</h4>)}
					<div className="p-5 flex gap-5">
						<button 
							className="p-3 flex border border-blue-500 rounded hover:bg-blue-300 cursor-pointer select-none 
							h-56 w-56 items-center justify-center"
							onClick={addNote}
						>
							<p className="text-3xl">Add Note</p>
						</button>
						{(notes.length > 0) && notes.map(note => <Note id={note.id} title={note.title} content={note.content} onDelete={onDelete} />)}
					</div>
					<PopUpForm onClose={onClose} onSubmit={onSubmit} showForm={showForm} />
				</div>
			) : (
				<div className="flex flex-col gap-5 w-4/5">
					<h1 className="text-7xl">Welcome to the Simple Django-Next.js App!</h1>
					<div>
						<h2 className="text-3xl">
							To view your notes, please{" "}
							<Link href="/login" className="font-bold underline">
								Login
							</Link>
							.
						</h2>
					</div>
					<div>
						<h2 className="text-3xl">
							If you have not created an account yet, please{" "}
							<Link href="/register" className="font-bold underline">
								Register
							</Link>
							.
						</h2>
					</div>
				</div>
			)}
		</>
	);
}
