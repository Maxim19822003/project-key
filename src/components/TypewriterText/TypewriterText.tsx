import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './TypewriterText.module.css';

const DEFAULT_SPEED_MS = 32;

type TypewriterTextProps = {
  text: string;
  speedMs?: number;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speedMs = DEFAULT_SPEED_MS,
  onComplete,
}: TypewriterTextProps) {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const completedRef = useRef(false);

  const complete = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    setVisibleLength(text.length);
    setIsComplete(true);
    onComplete?.();
  }, [onComplete, text.length]);

  useEffect(() => {
    completedRef.current = false;
    setVisibleLength(0);
    setIsComplete(false);

    if (!text) {
      complete();
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleLength(index);

      if (index >= text.length) {
        window.clearInterval(timer);
        complete();
      }
    }, speedMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [complete, speedMs, text]);

  const visibleText = text.slice(0, visibleLength);

  return (
    <button
      type="button"
      className={styles.textButton}
      onClick={complete}
      aria-label="Показать весь текст"
    >
      <p className={styles.text}>
        {visibleText.split('\n').map((line, lineIndex, lines) => (
          <span key={`${line}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
        {!isComplete ? <span className={styles.cursor} aria-hidden="true" /> : null}
      </p>
    </button>
  );
}
