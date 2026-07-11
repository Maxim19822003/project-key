# UI Layout

Единственный источник истины для разметки интерфейса проекта.

Система координат экрана телефона:

- `X = 0..100`
- `Y = 0..100`

---

## Экран: Карта мира

### Разметка экрана

| Зона | X | Y | W | H |
|------|---|---|---|---|
| Верхняя панель | 0 | 0 | 100 | 10 |
| Игровая область карты | 0 | 10 | 100 | 82 |
| Нижнее меню | 0 | 82 | 100 | 18 |

Панель сообщения («Выберите район Нео-Сити.») удалена. Освободившиеся ~10% высоты экрана переданы игровой области карты.

Координаты секторов мира задаются **относительно игровой области карты** (0..100 по X и Y).

Каждый сектор описывается полями:

- `id` — идентификатор
- `title` — название
- `shape` — форма области: `ellipse` | `polygon` | `customPath`
- `center` — центр (`x`, `y`)
- `boundingBox` — ограничивающий прямоугольник (`x`, `y`, `w`, `h`)
- `polygon` / `customPath` — точки или SVG-путь (для соответствующего `shape.type`)
- `safePadding` — отступ безопасной зоны внутри контура
- `labelPosition` — позиция подписи (`x`, `y`)
- `iconPosition` — позиция иконки (`x`, `y`)
- `status` — начальный статус: `locked` | `open` | `completed`
- `storyId` — id истории или `null`
- `effects` — слоты будущих эффектов (`animation`, `glow`, `particle`, `sound`, `music`)

### Замена карты художником

1. Заменить файл изображения по пути `map.imageSrc`.
2. Обновить координаты секторов в JSON-блоке ниже.
3. Пересобрать проект. Код React менять не нужно.

Проверка разметки: `?worldMapDebug=1` в URL или `VITE_WORLD_MAP_DEBUG=true`.

Визуальный редактор: `?editor=1` в URL или `VITE_EDITOR=true`.

### Визуальные состояния сектора

| Состояние | Когда применяется |
|-----------|-------------------|
| `locked` | Сектор закрыт |
| `available` | Сектор открыт (`open` в логике сохранения) |
| `completed` | История сектора пройдена |
| `active` | Hover / focus в DEBUG-режиме |

В обычной игре области клика невидимы. Контуры и подписи видны только в DEBUG.

### Миры

| id | title | shape | center | boundingBox | safePadding | labelPosition | iconPosition |
|----|-------|-------|--------|-------------|-------------|---------------|--------------|
| neo_city | Neo City | ellipse (14×10) | 50, 52 | 36, 42, 28, 20 | 2 | 50, 66 | 50, 52 |
| forest | Forest | polygon (5 точек) | 22, 35 | 12, 26, 20, 20 | 1.5 | 22, 50 | 22, 35 |
| ice | Ice | polygon (6 точек) | 78, 35 | 66, 28, 22, 20 | 1.5 | 78, 52 | 78, 35 |
| desert | Desert | ellipse (18×7) | 50, 18 | 32, 11, 36, 14 | 2 | 50, 28 | 50, 18 |
| dark_zone | Dark Zone | customPath | 78, 72 | 64, 62, 28, 26 | 1.5 | 78, 92 | 78, 72 |
| metro | Metro | polygon (5 точек) | 22, 72 | 10, 62, 24, 24 | 1.5 | 22, 90 | 22, 72 |
| ruins | Ruins | ellipse (12×5) | 50, 88 | 38, 83, 24, 10 | 2 | 50, 96 | 50, 88 |

### Машиночитаемые данные

```json
{
  "screen": "world_map",
  "coordinateSystem": { "x": [0, 100], "y": [0, 100] },
  "regions": {
    "topBar": { "x": 0, "y": 0, "w": 100, "h": 10 },
    "gameArea": { "x": 0, "y": 10, "w": 100, "h": 82 },
    "bottomMenu": { "x": 0, "y": 82, "w": 100, "h": 18 }
  },
  "map": {
    "projectId": "key",
    "imageSrc": "/projects/key/assets/world_map.webp",
    "imageAlt": "Карта мира"
  },
  "debug": {
    "enabled": false,
    "note": "Контуры секторов: ?worldMapDebug=1 в URL или VITE_WORLD_MAP_DEBUG=true"
  },
  "stateVisuals": {
    "locked": {
      "fill": "rgba(120, 120, 140, 0.22)",
      "stroke": "rgba(160, 160, 180, 0.85)",
      "strokeWidth": 0.4,
      "opacity": 0.75
    },
    "available": {
      "fill": "rgba(46, 204, 113, 0.22)",
      "stroke": "rgba(46, 204, 113, 0.9)",
      "strokeWidth": 0.5,
      "opacity": 0.85
    },
    "completed": {
      "fill": "rgba(155, 89, 255, 0.22)",
      "stroke": "rgba(155, 89, 255, 0.9)",
      "strokeWidth": 0.5,
      "opacity": 0.9
    },
    "active": {
      "fill": "rgba(255, 220, 120, 0.28)",
      "stroke": "rgba(255, 220, 120, 1)",
      "strokeWidth": 0.6,
      "opacity": 1
    }
  },
  "effectSlots": {
    "note": "Архитектура для будущих эффектов сектора. Сейчас все слоты null.",
    "fields": ["animation", "glow", "particle", "sound", "music"]
  },
  "sectors": [
    {
      "id": "neo_city",
      "title": "Neo City",
      "shape": { "type": "ellipse", "rx": 14, "ry": 10 },
      "center": { "x": 50, "y": 52 },
      "boundingBox": { "x": 36, "y": 42, "w": 28, "h": 20 },
      "safePadding": 2,
      "labelPosition": { "x": 50, "y": 66 },
      "iconPosition": { "x": 50, "y": 52 },
      "status": "open",
      "storyId": "neo_city",
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "forest",
      "title": "Forest",
      "shape": {
        "type": "polygon",
        "points": [
          { "x": 14, "y": 28 },
          { "x": 30, "y": 26 },
          { "x": 32, "y": 38 },
          { "x": 24, "y": 46 },
          { "x": 12, "y": 40 }
        ]
      },
      "center": { "x": 22, "y": 35 },
      "boundingBox": { "x": 12, "y": 26, "w": 20, "h": 20 },
      "safePadding": 1.5,
      "labelPosition": { "x": 22, "y": 50 },
      "iconPosition": { "x": 22, "y": 35 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "ice",
      "title": "Ice",
      "shape": {
        "type": "polygon",
        "points": [
          { "x": 70, "y": 28 },
          { "x": 86, "y": 30 },
          { "x": 88, "y": 42 },
          { "x": 80, "y": 48 },
          { "x": 68, "y": 44 },
          { "x": 66, "y": 32 }
        ]
      },
      "center": { "x": 78, "y": 35 },
      "boundingBox": { "x": 66, "y": 28, "w": 22, "h": 20 },
      "safePadding": 1.5,
      "labelPosition": { "x": 78, "y": 52 },
      "iconPosition": { "x": 78, "y": 35 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "desert",
      "title": "Desert",
      "shape": { "type": "ellipse", "rx": 18, "ry": 7 },
      "center": { "x": 50, "y": 18 },
      "boundingBox": { "x": 32, "y": 11, "w": 36, "h": 14 },
      "safePadding": 2,
      "labelPosition": { "x": 50, "y": 28 },
      "iconPosition": { "x": 50, "y": 18 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "dark_zone",
      "title": "Dark Zone",
      "shape": {
        "type": "customPath",
        "d": "M 68 64 L 88 62 L 92 74 L 86 86 L 70 88 L 64 76 Z"
      },
      "center": { "x": 78, "y": 72 },
      "boundingBox": { "x": 64, "y": 62, "w": 28, "h": 26 },
      "safePadding": 1.5,
      "labelPosition": { "x": 78, "y": 92 },
      "iconPosition": { "x": 78, "y": 72 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "metro",
      "title": "Metro",
      "shape": {
        "type": "polygon",
        "points": [
          { "x": 12, "y": 64 },
          { "x": 32, "y": 62 },
          { "x": 34, "y": 78 },
          { "x": 30, "y": 86 },
          { "x": 10, "y": 84 }
        ]
      },
      "center": { "x": 22, "y": 72 },
      "boundingBox": { "x": 10, "y": 62, "w": 24, "h": 24 },
      "safePadding": 1.5,
      "labelPosition": { "x": 22, "y": 90 },
      "iconPosition": { "x": 22, "y": 72 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    },
    {
      "id": "ruins",
      "title": "Ruins",
      "shape": { "type": "ellipse", "rx": 12, "ry": 5 },
      "center": { "x": 50, "y": 88 },
      "boundingBox": { "x": 38, "y": 83, "w": 24, "h": 10 },
      "safePadding": 2,
      "labelPosition": { "x": 50, "y": 96 },
      "iconPosition": { "x": 50, "y": 88 },
      "status": "locked",
      "storyId": null,
      "effects": { "animation": null, "glow": null, "particle": null, "sound": null, "music": null }
    }
  ]
}
```

---

## Экран: Коллекция

Система координат:

- `X = 0..100`
- `Y = 0..100`

### Разметка экрана

| Зона | X | Y | W | H |
|------|---|---|---|---|
| Верхняя панель | 0 | 0 | 100 | 10 |
| Область категорий | 0 | 10 | 22 | 72 |
| Область предметов | 22 | 10 | 78 | 72 |
| Нижнее меню | 0 | 82 | 100 | 18 |

### Категории

| id | title | icon |
|----|-------|------|
| all | Все | ◎ |
| keys | Ключи | 🔑 |
| artifacts | Артефакты | ✦ |
| materials | Материалы | ◆ |
| records | Записи | ▣ |
| other | Прочее | … |

### Сетка предметов

- columns: 4
- rows: 4
- gap: 2
- padding: 3
- cardAspectRatio: 1

### Карточка предмета

- icon — иконка
- title — название
- rarity — редкость
- count — количество
- lockedOverlay — оверлей для закрытых
- selectedState — состояние выбора
- hoverState — состояние наведения

### Окно предмета (Popup)

| Параметр | X | Y | W | H |
|----------|---|---|---|---|
| Popup | 8 | 12 | 84 | 76 |

Внутри Popup:

| Область | X | Y | W | H |
|---------|---|---|---|---|
| Большая иконка | 38 | 10 | 24 | 24 |
| Название | 8 | 38 | 84 | 8 |
| Редкость | 8 | 48 | 84 | 6 |
| Описание | 8 | 56 | 84 | 22 |
| Где используется | 8 | 80 | 84 | 8 |
| Кнопка закрыть | 90 | 4 | 8 | 8 |

### Машиночитаемые данные

```json
{
  "screen": "collection",
  "coordinateSystem": { "x": [0, 100], "y": [0, 100] },
  "regions": {
    "topBar": { "x": 0, "y": 0, "w": 100, "h": 10 },
    "categories": { "x": 0, "y": 10, "w": 22, "h": 72 },
    "items": { "x": 22, "y": 10, "w": 78, "h": 72 },
    "bottomMenu": { "x": 0, "y": 82, "w": 100, "h": 18 }
  },
  "background": {
    "imageSrc": "/content/ui/inventory.webp",
    "imageAlt": "Коллекция"
  },
  "categories": [
    { "id": "all", "title": "Все", "icon": "◎" },
    { "id": "keys", "title": "Ключи", "icon": "🔑" },
    { "id": "artifacts", "title": "Артефакты", "icon": "✦" },
    { "id": "materials", "title": "Материалы", "icon": "◆" },
    { "id": "records", "title": "Записи", "icon": "▣" },
    { "id": "other", "title": "Прочее", "icon": "…" }
  ],
  "grid": {
    "columns": 4,
    "rows": 4,
    "gap": 2,
    "padding": 3,
    "cardAspectRatio": 1
  },
  "card": {
    "icon": { "size": 40 },
    "title": { "maxLines": 2 },
    "rarity": { "visible": true },
    "count": { "visible": true },
    "lockedOverlay": { "opacity": 0.6 },
    "selectedState": { "borderWidth": 2 },
    "hoverState": { "opacity": 0.85 }
  },
  "popup": {
    "x": 8,
    "y": 12,
    "w": 84,
    "h": 76,
    "sections": {
      "icon": { "x": 38, "y": 10, "w": 24, "h": 24 },
      "title": { "x": 8, "y": 38, "w": 84, "h": 8 },
      "rarity": { "x": 8, "y": 48, "w": 84, "h": 6 },
      "description": { "x": 8, "y": 56, "w": 84, "h": 22 },
      "usage": { "x": 8, "y": 80, "w": 84, "h": 8 },
      "closeButton": { "x": 90, "y": 4, "w": 8, "h": 8 }
    }
  }
}
```

---

## Экран: История

Система координат:

- `X = 0..100`
- `Y = 0..100`

### Разметка экрана

| Зона | X | Y | W | H |
|------|---|---|---|---|
| Верхняя панель | 0 | 0 | 100 | 10 |
| Область иллюстрации | 0 | 10 | 100 | 48 |
| Область названия сцены | 0 | 58 | 100 | 6 |
| Область текста | 4 | 64 | 92 | 14 |
| Область выбора действий | 4 | 78 | 92 | 22 |

Область иллюстрации — единственное место для изображения сцены.

### Заголовок

- `title` — видимость названия сцены
- `subtitle` — видимость подзаголовка
- `visibility` — флаги отображения

### Текст

- `padding` — отступы
- `lineHeight` — межстрочный интервал
- `maxLines` — максимум строк
- `typewriterArea` — область печатной машинки

### Список действий

- `buttonHeight` — высота кнопки (%)
- `gap` — расстояние между кнопками (%)
- `radius` — скругление (%)
- `iconOffset` — смещение иконки (%)
- `textPadding` — отступ текста (%)
- минимум 1 действие, максимум 4
- при одном действии — кнопка «Продолжить»

### Popup находки

| Параметр | X | Y | W | H |
|----------|---|---|---|---|
| Popup | 12 | 18 | 76 | 64 |

Внутри Popup:

| Область | X | Y | W | H |
|---------|---|---|---|---|
| Иконка | 38 | 10 | 24 | 22 |
| Название | 8 | 36 | 84 | 8 |
| Описание | 8 | 46 | 84 | 18 |
| Редкость | 8 | 66 | 84 | 6 |
| Кнопка «Продолжить» | 20 | 76 | 60 | 12 |

### Safe Zone

**Обязательное правило:** все изображения сцен должны учитывать безопасные зоны.

Запрещено размещать важные элементы в области `Y = 58..100`.

Нижние 42% изображения считаются зоной интерфейса.

### Машиночитаемые данные

```json
{
  "screen": "story",
  "coordinateSystem": { "x": [0, 100], "y": [0, 100] },
  "regions": {
    "topBar": { "x": 0, "y": 0, "w": 100, "h": 10 },
    "illustration": { "x": 0, "y": 10, "w": 100, "h": 48 },
    "sceneTitle": { "x": 0, "y": 58, "w": 100, "h": 6 },
    "text": { "x": 4, "y": 64, "w": 92, "h": 14 },
    "actions": { "x": 4, "y": 78, "w": 92, "h": 22 }
  },
  "header": {
    "title": { "visible": true },
    "subtitle": { "visible": false }
  },
  "textLayout": {
    "padding": 3,
    "lineHeight": 1.5,
    "maxLines": 6,
    "typewriterArea": { "x": 0, "y": 0, "w": 100, "h": 100 }
  },
  "actionsLayout": {
    "buttonHeight": 12,
    "gap": 2,
    "radius": 8,
    "iconOffset": 4,
    "textPadding": 3,
    "minActions": 1,
    "maxActions": 4,
    "singleActionLabel": "Продолжить"
  },
  "rewardPopup": {
    "x": 12,
    "y": 18,
    "w": 76,
    "h": 64,
    "sections": {
      "icon": { "x": 38, "y": 10, "w": 24, "h": 22 },
      "title": { "x": 8, "y": 36, "w": 84, "h": 8 },
      "description": { "x": 8, "y": 46, "w": 84, "h": 18 },
      "rarity": { "x": 8, "y": 66, "w": 84, "h": 6 },
      "continueButton": { "x": 20, "y": 76, "w": 60, "h": 12 }
    }
  },
  "safeZone": {
    "forbiddenYFrom": 58,
    "forbiddenYTo": 100,
    "note": "Нижние 42% изображения — зона интерфейса. Важные элементы запрещены в Y=58..100."
  }
}
```

---

# Общий интерфейс (Global UI)

Единый Layout для всех общих элементов интерфейса проекта.

## Верхняя панель

Высота: **10%**

| Элемент | X | Y | W | H |
|---------|---|---|---|---|
| Аватар | 2 | 15 | 12 | 70 |
| Имя игрока | 16 | 20 | 28 | 35 |
| Уровень | 16 | 55 | 14 | 30 |
| Количество Ключей | 46 | 25 | 14 | 50 |
| Энергия | 62 | 25 | 18 | 50 |
| Иконка настроек | 86 | 20 | 12 | 60 |

## Нижнее меню

Высота: **18%**

| id | icon | label | X | Y | W | H |
|----|------|-------|---|---|---|---|
| world | 🌍 | Мир | 0 | 0 | 20 | 100 |
| story | 📖 | История | 20 | 0 | 20 | 100 |
| collection | 🗃 | Коллекция | 40 | 0 | 20 | 100 |
| quests | ✦ | Задания | 60 | 0 | 20 | 100 |
| profile | 👤 | Профиль | 80 | 0 | 20 | 100 |

## Popup, Dialog, Toast, Loading

Стандартные размеры и секции — в JSON-блоке ниже.

## Safe Zone (глобальная)

| Зона | Y |
|------|---|
| Верхняя панель | 0..10 |
| Нижнее меню | 82..100 |

## Общие правила проекта

1. Все координаты только в `UI_LAYOUT.md`.
2. React-компоненты не содержат координат.
3. CSS не содержит координат интерфейса.
4. Изображения никогда не являются интерфейсом.
5. Изображения являются только иллюстрациями.
6. Все новые экраны сначала описываются в `UI_LAYOUT.md`.

## Машиночитаемые данные

```json
{
  "screen": "global_ui",
  "coordinateSystem": { "x": [0, 100], "y": [0, 100] },
  "rules": [
    "Все координаты только в UI_LAYOUT.md",
    "React-компоненты не содержат координат",
    "CSS не содержит координат интерфейса",
    "Изображения никогда не являются интерфейсом",
    "Изображения являются только иллюстрациями",
    "Все новые экраны сначала описываются в UI_LAYOUT.md"
  ],
  "globalSafeZone": {
    "topBar": { "yFrom": 0, "yTo": 10 },
    "bottomMenu": { "yFrom": 82, "yTo": 100 },
    "note": "Верхняя панель Y=0..10 и нижнее меню Y=82..100 запрещены для генерации изображений."
  },
  "topBar": {
    "height": 10,
    "region": { "x": 0, "y": 0, "w": 100, "h": 10 },
    "elements": {
      "avatar": { "x": 2, "y": 15, "w": 12, "h": 70 },
      "playerName": { "x": 16, "y": 20, "w": 28, "h": 35 },
      "level": { "x": 16, "y": 55, "w": 14, "h": 30 },
      "keys": { "x": 46, "y": 25, "w": 14, "h": 50 },
      "energy": { "x": 62, "y": 25, "w": 18, "h": 50 },
      "settings": { "x": 86, "y": 20, "w": 12, "h": 60 }
    }
  },
  "bottomMenu": {
    "height": 18,
    "region": { "x": 0, "y": 82, "w": 100, "h": 18 },
    "items": [
      { "id": "world", "icon": "🌍", "label": "Мир", "region": { "x": 0, "y": 0, "w": 20, "h": 100 }, "path": "/world", "activeState": "accent", "inactiveState": "muted" },
      { "id": "story", "icon": "📖", "label": "История", "region": { "x": 20, "y": 0, "w": 20, "h": 100 }, "path": "/story/key/neo_city", "activeState": "accent", "inactiveState": "muted" },
      { "id": "collection", "icon": "🗃", "label": "Коллекция", "region": { "x": 40, "y": 0, "w": 20, "h": 100 }, "path": "/inventory", "activeState": "accent", "inactiveState": "muted" },
      { "id": "quests", "icon": "✦", "label": "Задания", "region": { "x": 60, "y": 0, "w": 20, "h": 100 }, "path": "/collection-stub", "activeState": "accent", "inactiveState": "muted" },
      { "id": "profile", "icon": "👤", "label": "Профиль", "region": { "x": 80, "y": 0, "w": 20, "h": 100 }, "path": "/settings", "activeState": "accent", "inactiveState": "muted" }
    ]
  },
  "popup": {
    "region": { "x": 10, "y": 12, "w": 80, "h": 76 },
    "sections": {
      "title": { "x": 8, "y": 6, "w": 76, "h": 10 },
      "content": { "x": 8, "y": 18, "w": 76, "h": 54 },
      "buttons": { "x": 8, "y": 74, "w": 76, "h": 14 },
      "close": { "x": 88, "y": 4, "w": 8, "h": 8 }
    }
  },
  "dialog": {
    "region": { "x": 8, "y": 18, "w": 84, "h": 64 },
    "sections": {
      "portrait": { "x": 6, "y": 8, "w": 22, "h": 30 },
      "name": { "x": 32, "y": 10, "w": 58, "h": 10 },
      "text": { "x": 6, "y": 42, "w": 88, "h": 38 },
      "buttons": { "x": 6, "y": 82, "w": 88, "h": 14 }
    }
  },
  "toast": {
    "region": { "x": 4, "y": 2, "w": 92, "h": 8 },
    "types": ["item_found", "key_received", "error", "saved"]
  },
  "loading": {
    "region": { "x": 0, "y": 0, "w": 100, "h": 100 },
    "sections": {
      "logo": { "x": 35, "y": 30, "w": 30, "h": 20 },
      "progressBar": { "x": 20, "y": 55, "w": 60, "h": 4 },
      "hint": { "x": 15, "y": 64, "w": 70, "h": 8 }
    }
  }
}
```
