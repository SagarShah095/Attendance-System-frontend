const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
};

export default function Toast({ message, type }) {
    return (
        <div className="fixed top-5 right-5 z-50 animate-slide-in">
            <div
                className={`px-5 py-3 rounded-lg shadow-lg text-white ${colors[type]}`}
            >
                {message}
            </div>
        </div>
    );
}
