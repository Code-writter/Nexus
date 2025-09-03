import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="flex justify-between">
            <ul className="flex gap-4" >
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <ul className="flex gap-4">
                <button onClick={() => navigate("/login")}>
                    logIn
                </button>
            </ul>
        </nav>
    );
}