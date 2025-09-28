import { useEffect, useState } from "react";

export default function ProgressBar({ duration }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start;
    let frame;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed < duration) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  return (
    <div className="progress-wrapper">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
