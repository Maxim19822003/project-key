# Story Visual Editor

Визуальный редактор сцен истории. Позволяет собирать новую историю **без изменения кода** — только через JSON-файлы Scene Layout.

## Включение

```
/story/key/neo_city?storyEditor=1
```

или

```
/story/key/neo_city?editor=1&story=1
```

или переменная окружения:

```
VITE_STORY_EDITOR=true
```

В обычной игре редактор **не загружается** и не влияет на производительность.

---

## Формат Scene Layout

Файлы хранятся в:

```
projects/key/stories/<storyId>/layouts/<sceneId>.layout.json
```

Пример структуры:

```json
{
  "version": 1,
  "sceneId": "scene_001",
  "storyId": "neo_city",
  "projectId": "key",
  "flow": {
    "earlyHotspots": true
  },
  "objects": [
    {
      "id": "box",
      "type": "hotspot",
      "label": "Коробка",
      "shape": { "type": "rectangle" },
      "space": "illustration",
      "x": 38,
      "y": 58,
      "width": 22,
      "height": 18,
      "rotation": 0,
      "scale": 1,
      "zIndex": 10,
      "animation": ["pulse", "glow"],
      "cursor": "pointer",
      "tooltip": "Коробка",
      "visible": true,
      "locked": false,
      "primary": true,
      "action": "navigate",
      "nextScene": "scene_003"
    }
  ]
}
```

### Типы объектов

| type | Назначение |
|------|------------|
| `hotspot` | Кликабельная область |
| `item` | Предмет на сцене |
| `npc` | Персонаж / NPC |
| `effect` | Визуальный эффект |
| `dialog` | Диалоговое окно |
| `reward` | Область награды |

### Фигуры (shape)

- `rectangle`
- `ellipse`
- `polygon` — массив `points`
- `customPath` — SVG-путь `d`

### Координаты

- `space: "illustration"` — 0..100 относительно области иллюстрации
- `space: "screen"` — 0..100 относительно всего экрана (popup, reward)

### Flow (логика сцены без StoryEngine)

```json
"flow": {
  "actions": [{ "id": "...", "label": "...", "nextScene": "..." }],
  "autoNavigate": "scene_007",
  "silentReward": "battery",
  "earlyHotspots": true,
  "ending": true
}
```

StoryEngine **не меняется**. Адаптер `sceneLayout` читает готовые данные и передаёт hotspot-конфигурацию в игру.

---

## Как создать новую сцену

1. Создайте JSON сцены в `projects/.../scenes/scene_XXX.json` (текст, фон, награда).
2. Откройте сцену в браузере с `?storyEditor=1`.
3. Нажмите **+ Add object** → выберите тип (hotspot, item, npc…).
4. Перетащите объект, измените размер маркерами, поверните ручкой сверху.
5. Настройте свойства в **Inspector** справа.
6. Управляйте порядком в панели **Objects** слева.
7. Нажмите **Export Scene**.
8. Сохраните файл как `projects/key/stories/<story>/layouts/<sceneId>.layout.json`.
9. Пересоберите проект (`npm run build`).

---

## Как расставить hotspot

1. **+ Add object → Hotspot**
2. Разместите область на иллюстрации
3. В Inspector задайте:
   - `action`: `navigate` | `dialog` | `locked`
   - `nextScene` — для navigate
   - `dialog` — для dialog
   - `lockedMessage` — для locked
4. Включите `primary: true` для главного объекта сцены
5. Добавьте `animation`: `pulse`, `glow`, `sway`, `blink`, `float`, `fade`

---

## Copy / Export / Import

| Кнопка | Действие |
|--------|----------|
| **Copy Scene JSON** | Копирует JSON в буфер обмена |
| **Export Scene** | Скачивает `.layout.json` файл |
| **Import Scene** | Вставьте JSON — сцена отобразится идентично |

Для объектов: **Copy object** / **Paste object** в Inspector.

---

## Панели редактора

### Toolbar
- Grid, Snap, Safe Zone, Layers
- Фильтр пространства: illustration / screen
- Добавление объектов

### Objects (слева)
- Список объектов по z-index
- Скрыть / заблокировать
- Изменить порядок слоёв
- Удалить

### Inspector (справа)
- Все свойства выбранного объекта
- id, type, shape, X, Y, Width, Height
- rotation, scale, z-index
- animation, cursor, tooltip, visibility

---

## Связь с StoryEngine

```
scene_XXX.layout.json  →  sceneLayout/loader  →  adapter  →  HotspotConfig  →  игра
```

StoryEngine читает только `scenes/scene_XXX.json` (текст, фон, reward).
Визуальная разметка — отдельный слой Scene Layout.

---

## Проверка

После экспорта:

1. Перезапустите dev-сервер
2. Пройдите сцену **без** `?storyEditor=1`
3. Убедитесь, что hotspot-области совпадают с редактором
