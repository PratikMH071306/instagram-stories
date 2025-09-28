export default function StoriesBar({ stories, onOpen }) {
  return (
    <div className="stories-bar">
      {stories.map((story, i) => (
        <img
          key={story.id}
          src={story.url}
          alt={`story-${i}`}
          className="story-thumbnail"
          onClick={() => onOpen(i)}
        />
      ))}
    </div>
  );
}
