import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../Components/FriendCard";
import NoFriendsFound from "../Components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends, isLoading, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return <div className="text-center p-8">Loading friends...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load friends. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Your Friends</h1>
      {friends && friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      ) : (
        <NoFriendsFound />
      )}
    </div>
  );
};

export default FriendsPage;
