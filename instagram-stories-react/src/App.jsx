import { useEffect, useState } from "react";
import StoriesBar from "./components/StoriesBar";
import StoryViewer from "./components/StoryViewer";

const preloadImages = (urls) => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        })
    )
  );
};

export default function App() {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then(async (data) => {
        setStories(data);
        // preload all images before allowing viewer
        await preloadImages(data.map((story) => story.url));
        setLoadingStories(false);
      })
      .catch((err) => {
        console.error("Failed to load stories", err);
        setLoadingStories(false);
      });
  }, []);

  if (loadingStories) {
    return <div className="app-loading">Loading stories...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">Stories</header>
      <StoriesBar stories={stories} onOpen={setCurrentIndex} />

      {currentIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
