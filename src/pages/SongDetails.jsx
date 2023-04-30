import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from '../redux/services/shazam-core';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songId);
  const { data: relatedSongsData, isFetching: isFetchingRelatedSongs, error } = useGetSongsRelatedQuery(songId);

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, relatedSongsData, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections?.[1]?.type === 'LYRICS'
            ? songData.sections[1].text.map((line) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
            : <p className="text-gray-400 text-base my-1">No lyrics found</p>}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default SongDetails;
