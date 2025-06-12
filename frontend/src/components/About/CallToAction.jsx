import { Link } from "@tanstack/react-router";

const CallToAction = () => {
  return (
    <div className="text-center bg-blue-50 rounded-xl p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Join thousands of users who are shortening their links with our service.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Start Shortening URLs
      </Link>
    </div>
  );
};

export default CallToAction;
