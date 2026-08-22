import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
        404
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-medium"
      >
        &larr; Go back to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
