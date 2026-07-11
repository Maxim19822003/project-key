import { useState } from 'react';
import { BottomBar, TopBar } from '@/components';
import { INVENTORY_ITEMS } from '@/game/inventory';
import { useGameSave } from '@/hooks/useGameSave';
import '@/styles/screen.css';
import styles from './InventoryScreen.module.css';

const INVENTORY_IMAGE_URL = '/content/ui/inventory.webp';

export function InventoryScreen() {
  const { save } = useGameSave();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const selectedItem = INVENTORY_ITEMS.find((item) => item.id === selectedItemId);
  const isFound = selectedItem
    ? save.foundItems.includes(selectedItem.id)
    : false;

  const handleSlotClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  return (
    <div className="screen">
      <TopBar title="Коллекция" subtitle="Находки" />
      <div className={`screen__body ${styles.body}`}>
        <div className={styles.scene}>
          <img
            className={styles.background}
            src={INVENTORY_IMAGE_URL}
            alt="Коллекция находок"
          />
          <div className={styles.slots}>
            {INVENTORY_ITEMS.map((item) => {
              const found = save.foundItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.slot}${found ? ` ${styles.found}` : ` ${styles.locked}`}`}
                  style={{
                    left: `${item.slotX}%`,
                    top: `${item.slotY}%`,
                    width: `${item.slotSize}%`,
                    height: `${item.slotSize}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label={item.name}
                  onClick={() => handleSlotClick(item.id)}
                >
                  <span className={styles.emoji} aria-hidden="true">
                    {found ? item.emoji : '░'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.detail}>
          {selectedItem ? (
            isFound ? (
              <>
                <p className={styles.detailTitle}>
                  {selectedItem.emoji} {selectedItem.name}
                </p>
                <p className={styles.detailText}>{selectedItem.description}</p>
              </>
            ) : (
              <p className={styles.detailText}>Этот предмет ещё не найден.</p>
            )
          ) : (
            <p className={styles.detailText}>Выберите предмет в коллекции.</p>
          )}
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
