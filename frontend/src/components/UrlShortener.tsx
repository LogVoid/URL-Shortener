import { useState } from "react";

const Login: React.FC = () => {
    const [shortlinkInputBuffer, setShortlinkInputBuffer] = useState("");
    const [shortlinkCreated, setShortlinkCreated] = useState(false);
    const [shortlink, setShortlink] = useState("");

    const handleCreateShortlink = async (): Promise<void> => {
        try {
            const response = await fetch("http://localhost:5000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    link: shortlinkInputBuffer,
                }),
            });
            if (response.ok) {
                const data = await response.json();

                setShortlink(data.pointer);
                setShortlinkCreated(true);
            }
        } catch(error) {

        };
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-[45vw] h-[70vh] p-10 bg-white rounded shadow-md">
                <h1 className="text-center text-xl font-bold mb-8">Create a shortlink</h1>
                <div className="mb-4 h-6">
                    {shortlinkCreated && (
                        <p className="text-green-500 text-center">Created {shortlink} successfully!</p>
                    )}
                </div>
                <div className="flex flex-col items-center mt-6">
                    <div className="w-[80%] sm:w-[50%] mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Link to shorten</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShortlinkInputBuffer(e.target.value)}
                            value={shortlinkInputBuffer}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Link"
                        />
                    </div>
                    <div className="w-[80%] sm:w-[50%] mb-6 mt-3">
                        <button onClick={handleCreateShortlink} className="w-full bg-blue-500 hover:bg-blue-700 active:scale-95 transition-transform duration-150 ease-out text-white font-bold py-2 px-3 rounded">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
