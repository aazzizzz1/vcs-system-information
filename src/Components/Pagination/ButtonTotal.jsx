import React from 'react'

const ButtonTotal = () => {
  return (
    <section className="flex items-center h-screen bg-gray-50 dark:bg-gray-900">
  <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
    {/* Start coding here */}
    <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md dark:bg-gray-800">
      <nav
        className="flex flex-row items-center justify-between p-4"
        aria-label="Table navigation"
      >
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          View full report
        </button>
        <p className="text-sm">
          <span className="font-normal text-gray-500 dark:text-gray-400">
            Total users:
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            1867
          </span>
        </p>
      </nav>
    </div>
  </div>
</section>

  )
}

export default ButtonTotal