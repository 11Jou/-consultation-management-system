
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Consultation Management System</h3>
          <p className="text-gray-600">Login to your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-900" />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-900" />
            </div>
            <div className="space-y-2">
              <button
                type='submit'
                className="w-full bg-[#0096FF] hover:bg-[#007ACC] text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}