"use client"

export const BackgroundBoxesDemo = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 opacity-20 blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-purple-600 via-indigo-500 to-blue-400 opacity-20 blur-xl"></div>
    </div>
  )
}