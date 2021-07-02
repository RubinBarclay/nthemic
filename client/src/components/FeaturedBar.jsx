import React, { useRef } from 'react';
import useScrollBox from '../customHooks/useScrollBox';

const FeaturedBar = ({ title, items, play }) => {
  const scrollWrapperRef = useRef();
  const { isDragging } = useScrollBox(scrollWrapperRef);

  return (
    <div className="relative w-full p-4 overflow-hidden">
      <h4 className="py-2 text-2xl">{title}</h4>
      <div className="w-full h-full overflow-x-scroll overflow-y-hidden scrollbar-hide" ref={scrollWrapperRef}>
        <div className="inline-flex h-full" role="list" style={{ pointerEvents: isDragging ? 'none' : undefined }}>
          {
            items.map(item => (
              <img 
                key={item.id} 
                src={item.albumCoverLG} 
                alt={item.name} 
                onClick={() => play(item)}
                className="flex-shrink-0 w-48 h-48 mr-4" role="listitem" />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default FeaturedBar;
