import { Link } from "react-router-dom";
import { getLanguageFlag } from "../lib/languageUtils";


const FriendCard = ({ friend }) => {
  const nativeFlag = getLanguageFlag(friend.nativeLanguage);
  const learningFlag = getLanguageFlag(friend.learningLanguage);

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {nativeFlag && (
              <img
                src={nativeFlag.src}
                alt={nativeFlag.alt}
                className="h-3 mr-1 inline-block"
              />
            )}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {learningFlag && (
              <img
                src={learningFlag.src}
                alt={learningFlag.alt}
                className="h-3 mr-1 inline-block"
              />
            )}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
