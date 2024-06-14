import { FC } from "react";

interface NoteProps{
    id: number;
    title: string;
    content: string;
    onDelete: (id: number) => void;
}


const Note:FC<NoteProps> = ({id, title, content, onDelete}) => {
    return (
        <div className="p-3 box-border bg-blue-300 rounded border grid grid-cols-1 grid-rows-6 gap-3 w-56 h-56" key={id}>
            <h4 className="text-3xl row-span-1">{title}</h4>
            <p className="row-span-4">{content}</p>
            <div className="row-span-1 flex items-center justify-center">
                <button 
                    className="p-2 rounded border bg-red-400 hover:bg-red-600 text-slate-50 "
                    onClick={() => onDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Note;