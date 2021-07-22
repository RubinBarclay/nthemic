import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthCodeContext from '../context/AuthCodeContext';
import displayDuration from '../utilities/displayDuration';
import SpotifyWebApi from 'spotify-web-api-node';
import { ClockIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';

const Collection = () => {
  const { id, type } = useParams();
  const [collectionInfo, setCollectionInfo] = useState();
  const [hover, setHover] = useState(false);
  const accessToken = useContext(AuthCodeContext);

  const spotifyApi = new SpotifyWebApi({
    clientId: '11c9d0da629948fb87a800307b571162',
  })

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    if (type === 'album') {
      spotifyApi.getAlbum(id).then(data => {
        console.log(data.body)
        setCollectionInfo({
          type: type,
          collectionID: id,
          name: data.body.name,
          author: data.body.artists[0].name,
          albumCoverLG: album.images[1].url,
          albumCoverSM: album.images[2].url,
          tracks: data.body.tracks.items.map(track => ({
            id: track.id,
            uri: track.uri,
            name: track.name,
            album: data.body.name,
            artist: track.artists[0].name,
            duration: track.duration_ms,
          }))
        })
      })
    } else if (type === 'playlist') {
      spotifyApi.getPlaylist(id).then(data => {
        console.log(data.body)
        setCollectionInfo({
          // tracks, image(s), name(s) etc.
          type: type,
          collectionID: id,
          name: data.body.name,
          author: data.body.owner.display_name,
          albumCoverLG: data.body.images[0].url,
          tracks: data.body.tracks.items.slice(0, 20).map(track => ({
            id: track.track.id,
            uri: track.track.uri,
            name: track.track.name,
            album: track.track.album.name,
            artist: track.track.artists[0].name,
            duration: track.track.duration_ms,
            albumCoverLG: track.track.album.images[1].url,
            albumCoverSM: track.track.album.images[2].url
          }))
        })
      })
    }
  }, [accessToken])

  return collectionInfo ? (
    <div className="w-full h-full px-48 pt-32">
      <div className="flex items-center h-1/3">
        <img className="h-auto w-72"src={collectionInfo.albumCoverLG} alt={collectionInfo.name} />
        <div className="pl-6">
          <h1 className="text-5xl">{collectionInfo.name}</h1>
          <h2 className="py-2 text-xl text-gray-400">By: {collectionInfo.author}</h2>
        </div>
      </div>

      <table className="w-full mt-8 text-lg text-center">
        <thead>
          <tr className="pt-2">
            <th>#</th>
            <th className="pl-2 text-left">Track</th>
            <th><ClockIcon className="w-5 h-auto mx-auto"/></th>
          </tr>
        </thead>
        <tbody>
          {
            collectionInfo.tracks.map((track, index) => (
              <tr 
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                className="border border-t-4 border-b-4 border-transparent">
                <td>{hover ? <PlayIcon className="w-5 h-auto mx-auto" /> : index + 1}</td>
                <td className="pl-2 text-left">{track.name}</td>
                <td>{displayDuration(track.duration)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  ) : null;
}

export default Collection;

