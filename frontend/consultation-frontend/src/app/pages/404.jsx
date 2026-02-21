import { Link } from 'react-router-dom'
export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-gray-600">Page not found</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">Go to home</Link>
        </div>
    )
}