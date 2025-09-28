import { useEffect, useState, useCallback } from "react";
import ProgressBar from "./ProgressBar";

const AUTO_ADVANCE_MS = 5000;

export default function StoryViewer({ stories = [], currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  const [progressKey, setProgressKey] = useState(0);
  const [loading, setLoading] = useState(true);

  // keep index in sync when parent changes
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const nextStory = useCallback(() => {
    setIndex((prev) => {
      if (prev < stories.length - 1) {
        setProgressKey((k) => k + 1);
        return prev + 1;
      } else {
        onClose();
        return prev;
      }
    });
  }, [stories.length, onClose]);

  const prevStory = useCallback(() => {
    setIndex((prev) => {
      if (prev > 0) {
        setProgressKey((k) => k + 1);
        return prev - 1;
      } else {
        onClose();
        return prev;
      }
    });
  }, [onClose]);

  // auto-advance
  useEffect(() => {
    if (!stories[index]) return;
    setLoading(true);

    const timer = setTimeout(() => {
      nextStory();
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [index, stories, nextStory]);

  const currentStory = stories[index];

  return (
    <div className="story-viewer">
      <div className="viewer-top">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close viewer"
        >
          ✕
        </button>
      </div>

      <div className="story-area">
        {loading && <div className="spinner"></div>}

        {currentStory ? (
          <img
            src={currentStory.url}
            alt="story"
            className={`story-img ${loading ? "hidden" : "visible"}`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        ) : (
          <div className="no-story">No story available</div>
        )}

        <div
          className="tap-zone left-zone"
          onClick={prevStory}
          aria-label="Previous story"
        ></div>
        <div
          className="tap-zone right-zone"
          onClick={nextStory}
          aria-label="Next story"
        ></div>

        <ProgressBar key={progressKey} duration={AUTO_ADVANCE_MS} />
      </div>
    </div>
  );
}
