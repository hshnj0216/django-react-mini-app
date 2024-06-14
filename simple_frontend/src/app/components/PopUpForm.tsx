import { FC, FormEvent, useState } from "react";

interface PopUpFormProps {
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
    showForm: boolean;
}

interface FormData {
    title: string;
    content: string;
}

const PopUpForm: FC<PopUpFormProps> = ({ onClose, onSubmit, showForm }) => {
    const [formData, setFormData] = useState<FormData>({ title: "", content: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${showForm ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-5 rounded shadow-lg z-10">
            <form onSubmit={handleSubmit} className="py-3 px-5 w-80">
                    <h5 className="text-lg mb-3 text-center">Add Note</h5>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUpForm;
