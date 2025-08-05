import React, { useRef, useState, useEffect, useCallback } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({ items, itemHeight, height, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(items.length, startIndex + visibleCount + 2); // +2 for buffer

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Use a fixed margin between cards
  const margin = 16;
  const totalHeight = items.length > 0 ? items.length * itemHeight + (items.length - 1) * margin : 0;

  return (
    <div
      ref={containerRef}
      style={{
        height,
        overflowY: 'auto',
        width: '100%',
        position: 'relative',
      }}
    >
      <div style={{ height: totalHeight, width: '100%', position: 'relative' }}>
        {items.slice(startIndex, endIndex).map((item, i) => {
          const realIndex = startIndex + i;
          return (
            <div
              key={realIndex}
              style={{
                position: 'absolute',
                top: realIndex * (itemHeight + margin),
                left: 0,
                right: 0,
                height: itemHeight,
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {renderItem(item, realIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
