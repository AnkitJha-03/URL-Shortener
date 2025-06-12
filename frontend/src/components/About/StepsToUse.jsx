const StepsToUse = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
      <div className="space-y-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-blue-600 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Paste Your Long URL</h3>
            <p className="text-gray-600">Enter any lengthy URL you want to shorten in our dashboard.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <span className="text-green-600 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Your Short Link</h3>
            <p className="text-gray-600">Our system generates a compact, easy-to-share version instantly.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <span className="text-purple-600 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share & Track</h3>
            <p className="text-gray-600">Distribute your link and monitor its performance in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsToUse;
