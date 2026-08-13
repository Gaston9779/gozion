// @ts-nocheck
import { useEffect, useRef, FC, ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
  /** Card contents. A comma-separated string is accepted as a convenient shorthand. */
  items?: (string | ReactNode)[] | string;
  gradientColor?: string;
  rows?: number;
  columns?: number;
  gap?: number;
  itemBackground?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = '#5b55e7', rows = 4, columns = 7, gap = 12, itemBackground = '#11131b' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(window.innerWidth / 2);

  const totalItems = Math.max(1, rows * columns);
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const normalizedItems = typeof items === 'string' ? items.split(',').map(item => item.trim()).filter(Boolean) : items;
  const combinedItems = normalizedItems.length > 0 ? Array.from({ length: totalItems }, (_, index) => normalizedItems[index % normalizedItems.length]) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handlePointerMove = (e: PointerEvent): void => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (rect) mouseXRef.current = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    };

    const updateMotion = (): void => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const width = gridRef.current?.getBoundingClientRect().width || window.innerWidth;
          const moveAmount = ((mouseXRef.current / width) * maxMoveAmount - maxMoveAmount / 2) * direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    const host = gridRef.current;
    host?.addEventListener('pointermove', handlePointerMove);

    return () => {
      host?.removeEventListener('pointermove', handlePointerMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{ background: `radial-gradient(circle at 50% 50%, ${gradientColor} 0%, transparent 68%)` }}
      >
        <div className="gridMotion-container" style={{ '--grid-motion-gap': `${gap}px`, '--grid-motion-columns': columns, '--grid-motion-rows': rows } as CSSProperties}>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={el => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: columns }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * columns + itemIndex];
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: itemBackground }}>
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${content})`
                          }}
                        ></div>
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
