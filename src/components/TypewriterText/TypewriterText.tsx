import styles from './TypewriterText.module.css';

type TypewriterTextProps = {
  text: string;
};

export function TypewriterText({ text }: TypewriterTextProps) {
  return <p className={styles.text}>{text}</p>;
}
