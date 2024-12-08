import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { getAllPlaylistsByUserId } from "../redux/reducers/media.reducer";
import { Playlist } from "../types/media";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector<RootState, User | null>(
    (state) => state.user.profile
  );

  const userPlaylist = useSelector<RootState, Playlist[]>(
    (state) => state.media.userPlaylist
  );

  useEffect(() => {
    if (userProfile !== null && userProfile.id) {
      dispatchAsync(getAllPlaylistsByUserId(userProfile.id));
    }
  }, [userProfile, dispatchAsync]);

  return (
    <div className="px-6 mt-10">
      <h1 className="text-2xl font-bold text-white mb-6">Your Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userPlaylist.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#1a1a1a] p-4 rounded-md flex flex-col gap-5 hover:bg-[#2a2a2a] hover:cursor-pointer"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <div className="w-full h-[150px] flex justify-center items-center">
              <img src={playlist.avatar} alt="avatar" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-white">{playlist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;