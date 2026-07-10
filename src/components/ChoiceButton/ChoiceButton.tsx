import styles from './ChoiceButton.module.css';

type ChoiceButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function ChoiceButton({ label, onClick, disabled = false }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
