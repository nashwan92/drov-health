export default function CurvedLinesBg() {
    return (
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="curved-lines absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Line 1 */}
        <path
          d="M0,80 C240,160 480,0 720,40 960,80 1200,160 1440,120"
          fill="none"
          stroke="#fbcfe8"   /* pink-200 */
          strokeWidth="2"
          className="line line-slow"
        />
  
        {/* Line 2 */}
        <path
          d="M0,120 C240,200 480,40 720,80 960,120 1200,200 1440,160"
          fill="none"
          stroke="#f9a8d4"   /* pink-300 */
          strokeWidth="2"
          opacity="0.7"
          className="line line-fast"
        />
      </svg>
    );
  }
  