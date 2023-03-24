// background animation
export default function Animation() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
      <div className="relative w-full max-w-lg mx-auto mt-96">
        <div className="absolute top-0 w-64 h-64 bg-indigo-300 rounded-full -left-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob"></div>
        <div className="absolute top-0 rounded-full w-72 h-72 bg-sky-300 -right-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute rounded-full w-72 h-72 bg-emerald-300 -bottom-8 left-20 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
