import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../Components/ChatLoader";
import CallButton from "../Components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, 
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    let isMounted = true;

    const initChat = async () => {
      console.log("authUser:", authUser);
      console.log("targetUserId:", targetUserId);
      console.log("tokenData:", tokenData);

      if (!tokenData?.token || !authUser?._id || !targetUserId) {
        console.warn("Missing required data to init chat");
        setLoading(false);
        return;
      }

      try {
        console.log("Initializing Stream client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Disconnect any existing client
        if (client.userID && client.userID !== authUser._id) {
          await client.disconnectUser();
        }

        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        }

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        if (isMounted) {
          setChatClient(client);
          setChannel(currChannel);
        }

      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initChat();

    return () => {
      isMounted = false;
      if (chatClient) {
        chatClient.disconnectUser().then(() => {
          console.log("Chat client disconnected");
        });
      }
    };
  }, [tokenData?.token, authUser?._id, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading) return <ChatLoader />;
  if (!chatClient || !channel) {
    return (
      <div className="flex justify-center items-center h-[93vh] text-center text-red-500">
        Failed to connect to chat. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
