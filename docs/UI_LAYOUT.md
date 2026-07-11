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
