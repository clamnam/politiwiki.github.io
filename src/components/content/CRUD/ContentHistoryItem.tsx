import { Content } from "../../../types";
import { formatDate } from "../../../utilities/formatter";

interface ContentHistoryItemProps {
  item: Content;
  index: number;
}

const ContentHistoryItem = ({ item, index }: ContentHistoryItemProps) => {
  let parsedHistory;
  try {
    parsedHistory = JSON.parse(item.history);
    const historyIndex = 0;
    
    if (parsedHistory[historyIndex] !== undefined) {
      parsedHistory = parsedHistory[historyIndex];
    }
  } catch (err) {
    console.error("Failed to parse history", err);
    return null;
  }

  if (!parsedHistory) {
    return null;
  }

  return (
    <div className="text-white" key={index}>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex justify-between m-4">
        <div>
          <div className="text-2xl font-serif">{parsedHistory?.title}</div>
          <div className="text-lg">{parsedHistory?.content_body}</div>
        </div>
        <div>
          {parsedHistory?.created_at ? (
            <div className="text-sm">created: {formatDate(parsedHistory?.created_at)}</div>
          ) : null}
          {parsedHistory?.updated_at ? (
            <div className="text-sm">updated: {formatDate(parsedHistory?.updated_at)}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContentHistoryItem;