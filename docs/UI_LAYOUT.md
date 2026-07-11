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
| Игровая область карты | 0 | 10 | 100 | 72 |
| Нижнее меню | 0 | 82 | 100 | 18 |

Координаты секторов мира задаются **относительно игровой области карты** (0..100 по X и Y).

Каждый сектор описывается полями:

- `id` — идентификатор
- `title` — название
- `center` — центр (`x`, `y`)
- `radius` — радиус (`r`)
- `status` — `locked` | `open` | `completed`
- `storyId` — id истории или `null`

### Миры

| id | title | center (x, y) | radius | status | storyId |
|----|-------|---------------|--------|--------|---------|
| neo_city | Neo City | 50, 52 | 11 | open | neo_city |
| forest | Forest | 22, 35 | 9 | locked | null |
| ice | Ice | 78, 35 | 9 | locked | null |
| desert | Desert | 50, 18 | 9 | locked | null |
| dark_zone | Dark Zone | 78, 72 | 8 | locked | null |
| metro | Metro | 22, 72 | 8 | locked | null |
| ruins | Ruins | 50, 88 | 7 | locked | null |

### Машиночитаемые данные

```json
{
  "screen": "world_map",
  "coordinateSystem": { "x": [0, 100], "y": [0, 100] },
  "regions": {
    "topBar": { "x": 0, "y": 0, "w": 100, "h": 10 },
    "gameArea": { "x": 0, "y": 10, "w": 100, "h": 72 },
    "bottomMenu": { "x": 0, "y": 82, "w": 100, "h": 18 }
  },
  "map": {
    "projectId": "key",
    "imageSrc": "/projects/key/assets/world_map.webp",
    "imageAlt": "Карта мира"
  },
  "sectors": [
    { "id": "neo_city", "title": "Neo City", "center": { "x": 50, "y": 52 }, "radius": 11, "status": "open", "storyId": "neo_city" },
    { "id": "forest", "title": "Forest", "center": { "x": 22, "y": 35 }, "radius": 9, "status": "locked", "storyId": null },
    { "id": "ice", "title": "Ice", "center": { "x": 78, "y": 35 }, "radius": 9, "status": "locked", "storyId": null },
    { "id": "desert", "title": "Desert", "center": { "x": 50, "y": 18 }, "radius": 9, "status": "locked", "storyId": null },
    { "id": "dark_zone", "title": "Dark Zone", "center": { "x": 78, "y": 72 }, "radius": 8, "status": "locked", "storyId": null },
    { "id": "metro", "title": "Metro", "center": { "x": 22, "y": 72 }, "radius": 8, "status": "locked", "storyId": null },
    { "id": "ruins", "title": "Ruins", "center": { "x": 50, "y": 88 }, "radius": 7, "status": "locked", "storyId": null }
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
