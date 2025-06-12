import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCopy } from "react-icons/fi";

import useAuthStore from "../../stores/auth.store";

const RecentUrls = () => {
  const urls = useAuthStore((state) => state.urls);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Your Recent Links</h2>
        <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
          View all <FiArrowRight className="ml-1" />
        </Link>
      </div>

      {urls && urls.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {urls
            .slice()
            .reverse()
            .slice(0, 5)
            .map((url) => (
              <div key={url._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      <a href={url.long_url} target="_blank" rel="noopener noreferrer">
                        {url.long_url}
                      </a>
                    </p>
                    <div className="mt-1 flex items-center">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                      >
                        {import.meta.env.VITE_BACKEND_URL + url.short_url}
                      </a>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL + url.short_url}`)
                        }
                        className="ml-2 text-gray-400 hover:text-gray-500"
                        title="Copy to clipboard"
                      >
                        <FiCopy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {url.clicks} clicks
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500">No recent links yet. Create your first one above!</p>
        </div>
      )}
    </div>
  );
};

export default RecentUrls;
