import React from 'react';

const getStubIconForMediaType = (mediaType) => {
  if (mediaType === 'audio') {
    return <span className="media-icon icon icon-volume-up" />;
  }

  if (mediaType === 'image') {
    return <span className="media-icon icon icon-image" />;
  }

  if (mediaType === 'video') {
    return <span className="media-icon icon icon-video" />;
  }
};

export function getMediaElement(mediaType, cgiRef, url) {
  const thumb = url && <img className="media-asset-thumbnail" src={url} />;
  const stub = getStubIconForMediaType(mediaType);

  if (stub) {
    return (
        <div key={cgiRef}>
          {thumb || stub}
          <span className="icon icon-lock" />
        </div>
    );
  }

  return '<<media>>';
}
