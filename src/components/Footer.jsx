import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#101028] relative  text-sm md:text-xl text-gray-400 text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} Nakhuda Student Forum. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
