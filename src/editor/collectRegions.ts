import type { LayoutRect } from '@/game/layout/types';
import { getNeoCityHotspots } from '@/game/neoCityGuide';
import { getCollectionLayout } from '@/game/inventory/uiLayout';
import { getStoryLayout } from '@/game/storyLayout/uiLayout';
import {
  getBottomMenuLayout,
  getDialogLayout,
  getGlobalUILayout,
  getLoadingLayout,
  getPopupLayout,
  getToastLayout,
  getTopBarLayout,
} from '@/game/ui/uiLayout';
import {
  getWorldMapLayout,
  getWorldMapSectorDefs,
  getWorldMapStateVisuals,
} from '@/game/world/uiLayout';
import {
  nestedToScreen,
  rectCenter,
  hotspotToRect,
} from '@/editor/coordinates';
import type { EditorRegion, EditorScreenId } from '@/editor/types';
import { EDITOR_TYPE_COLORS } from '@/editor/types';

type CollectOptions = {
  pathname: string;
  storySceneId: string;
  showGlobalUi: boolean;
  showPopup: boolean;
};

function makeRegion(input: {
  id: string;
  group: EditorScreenId;
  label: string;
  type: EditorRegion['type'];
  layer: number;
  screenRect: LayoutRect;
  localRect: LayoutRect;
  parentId?: string;
  shape?: string;
  status?: string;
  jsonKey: string;
  data: Record<string, unknown>;
}): EditorRegion {
  return {
    id: input.id,
    group: input.group,
    label: input.label,
    type: input.type,
    layer: input.layer,
    rect: input.screenRect,
    localRect: input.localRect,
    parentId: input.parentId,
    center: rectCenter(input.screenRect),
    shape: input.shape,
    status: input.status,
    debugColor: EDITOR_TYPE_COLORS[input.type],
    jsonKey: input.jsonKey,
    data: input.data,
  };
}

function addLayoutRect(
  regions: EditorRegion[],
  group: EditorScreenId,
  prefix: string,
  key: string,
  label: string,
  localRect: LayoutRect,
  parent?: { id: string; rect: LayoutRect },
  layer = 10,
  data?: Record<string, unknown>,
) {
  const screenRect = parent ? nestedToScreen(localRect, parent.rect) : localRect;

  regions.push(
    makeRegion({
      id: `${prefix}.${key}`,
      group,
      label,
      type: parent ? 'element' : 'region',
      layer,
      screenRect,
      localRect,
      parentId: parent?.id,
      jsonKey: key,
      data: data ?? { ...localRect },
    }),
  );
}

function collectWorldMapRegions(): EditorRegion[] {
  const regions: EditorRegion[] = [];
  const layout = getWorldMapLayout();
  const gameArea = layout.regions.gameArea;
  const stateVisuals = getWorldMapStateVisuals();

  Object.entries(layout.regions).forEach(([key, rect]) => {
    addLayoutRect(regions, 'world_map', 'world', key, key, rect, undefined, 5, {
      ...rect,
    });
  });

  getWorldMapSectorDefs().forEach((sector, index) => {
    const localRect = sector.boundingBox;
    const screenRect = nestedToScreen(localRect, gameArea);
    const visualKey =
      sector.status === 'locked'
        ? 'locked'
        : sector.status === 'completed'
          ? 'completed'
          : 'available';

    regions.push(
      makeRegion({
        id: `world.sector.${sector.id}`,
        group: 'world_map',
        label: sector.title,
        type: 'sector',
        layer: 20 + index,
        screenRect,
        localRect,
        parentId: 'world.gameArea',
        shape: sector.shape.type,
        status: sector.status,
        jsonKey: `sectors.${sector.id}`,
        data: { ...sector },
      }),
    );

    const last = regions[regions.length - 1];
    last.debugColor =
      stateVisuals[visualKey as keyof typeof stateVisuals]?.stroke ??
      EDITOR_TYPE_COLORS.sector;
  });

  return regions;
}

function collectStoryRegions(storySceneId: string): EditorRegion[] {
  const regions: EditorRegion[] = [];
  const layout = getStoryLayout();
  const illustration = layout.regions.illustration;

  Object.entries(layout.regions).forEach(([key, rect]) => {
    addLayoutRect(regions, 'story', 'story', key, key, rect, undefined, 5, {
      ...rect,
    });
  });

  regions.push(
    makeRegion({
      id: 'story.safeZone',
      group: 'story',
      label: 'Safe Zone',
      type: 'safeZone',
      layer: 2,
      screenRect: {
        x: 0,
        y: layout.safeZone.forbiddenYFrom,
        w: 100,
        h: layout.safeZone.forbiddenYTo - layout.safeZone.forbiddenYFrom,
      },
      localRect: {
        x: 0,
        y: layout.safeZone.forbiddenYFrom,
        w: 100,
        h: layout.safeZone.forbiddenYTo - layout.safeZone.forbiddenYFrom,
      },
      jsonKey: 'safeZone',
      data: { ...layout.safeZone },
    }),
  );

  getNeoCityHotspots(storySceneId).forEach((hotspot, index) => {
    const localRect = hotspotToRect(hotspot);
    const screenRect = nestedToScreen(localRect, illustration);

    regions.push(
      makeRegion({
        id: `story.hotspot.${hotspot.id}`,
        group: 'story',
        label: hotspot.label,
        type: 'hotspot',
        layer: 30 + index,
        screenRect,
        localRect,
        parentId: 'story.illustration',
        shape: hotspot.shape ?? 'rect',
        status: hotspot.action,
        jsonKey: `hotspots.${storySceneId}.${hotspot.id}`,
        data: { ...hotspot },
      }),
    );
  });

  return regions;
}

function collectCollectionRegions(): EditorRegion[] {
  const regions: EditorRegion[] = [];
  const layout = getCollectionLayout();

  Object.entries(layout.regions).forEach(([key, rect]) => {
    addLayoutRect(regions, 'collection', 'collection', key, key, rect, undefined, 5, {
      ...rect,
    });
  });

  return regions;
}

function collectPopupRegions(screenGroup: EditorScreenId): EditorRegion[] {
  const regions: EditorRegion[] = [];

  if (screenGroup === 'story') {
    const layout = getStoryLayout();
    const popup = layout.rewardPopup;

    addLayoutRect(
      regions,
      'popup',
      'story-popup',
      'popup',
      'Story Reward Popup',
      popup,
      undefined,
      40,
      { ...popup },
    );

    Object.entries(popup.sections).forEach(([key, rect]) => {
      addLayoutRect(
        regions,
        'popup',
        'story-popup',
        key,
        key,
        rect,
        { id: 'story-popup.popup', rect: popup },
        45,
        { ...rect },
      );
    });
  }

  if (screenGroup === 'collection') {
    const layout = getCollectionLayout();
    const popup = layout.popup;

    addLayoutRect(
      regions,
      'popup',
      'collection-popup',
      'popup',
      'Collection Popup',
      popup,
      undefined,
      40,
      { ...popup },
    );

    Object.entries(popup.sections).forEach(([key, rect]) => {
      addLayoutRect(
        regions,
        'popup',
        'collection-popup',
        key,
        key,
        rect,
        { id: 'collection-popup.popup', rect: popup },
        45,
        { ...rect },
      );
    });
  }

  const globalPopup = getPopupLayout();
  addLayoutRect(
    regions,
    'popup',
    'global-popup',
    'popup',
    'Global Popup',
    globalPopup.region,
    undefined,
    38,
    { ...globalPopup.region },
  );

  Object.entries(globalPopup.sections).forEach(([key, rect]) => {
    addLayoutRect(
      regions,
      'popup',
      'global-popup',
      key,
      key,
      rect,
      { id: 'global-popup.popup', rect: globalPopup.region },
      42,
      { ...rect },
    );
  });

  return regions;
}

function collectGlobalUiRegions(): EditorRegion[] {
  const regions: EditorRegion[] = [];
  const layout = getGlobalUILayout();
  const topBar = getTopBarLayout();
  const bottomMenu = getBottomMenuLayout();

  addLayoutRect(
    regions,
    'global_ui',
    'global',
    'topBar',
    'Top Bar',
    topBar.region,
    undefined,
    50,
    { ...topBar.region },
  );

  Object.entries(topBar.elements).forEach(([key, rect]) => {
    addLayoutRect(
      regions,
      'global_ui',
      'global',
      `topBar.${key}`,
      key,
      rect,
      { id: 'global.topBar', rect: topBar.region },
      55,
      { ...rect },
    );
  });

  addLayoutRect(
    regions,
    'global_ui',
    'global',
    'bottomMenu',
    'Bottom Menu',
    bottomMenu.region,
    undefined,
    50,
    { ...bottomMenu.region },
  );

  bottomMenu.items.forEach((item) => {
    addLayoutRect(
      regions,
      'global_ui',
      'global',
      `bottomMenu.${item.id}`,
      item.label,
      item.region,
      { id: 'global.bottomMenu', rect: bottomMenu.region },
      55,
      { ...item.region, id: item.id, label: item.label },
    );
  });

  regions.push(
    makeRegion({
      id: 'global.safeZone.top',
      group: 'global_ui',
      label: 'Safe Zone Top',
      type: 'safeZone',
      layer: 1,
      screenRect: {
        x: 0,
        y: layout.globalSafeZone.topBar.yFrom,
        w: 100,
        h: layout.globalSafeZone.topBar.yTo - layout.globalSafeZone.topBar.yFrom,
      },
      localRect: {
        x: 0,
        y: layout.globalSafeZone.topBar.yFrom,
        w: 100,
        h: layout.globalSafeZone.topBar.yTo - layout.globalSafeZone.topBar.yFrom,
      },
      jsonKey: 'globalSafeZone.topBar',
      data: { ...layout.globalSafeZone.topBar },
    }),
  );

  regions.push(
    makeRegion({
      id: 'global.safeZone.bottom',
      group: 'global_ui',
      label: 'Safe Zone Bottom',
      type: 'safeZone',
      layer: 1,
      screenRect: {
        x: 0,
        y: layout.globalSafeZone.bottomMenu.yFrom,
        w: 100,
        h:
          layout.globalSafeZone.bottomMenu.yTo -
          layout.globalSafeZone.bottomMenu.yFrom,
      },
      localRect: {
        x: 0,
        y: layout.globalSafeZone.bottomMenu.yFrom,
        w: 100,
        h:
          layout.globalSafeZone.bottomMenu.yTo -
          layout.globalSafeZone.bottomMenu.yFrom,
      },
      jsonKey: 'globalSafeZone.bottomMenu',
      data: { ...layout.globalSafeZone.bottomMenu },
    }),
  );

  const dialog = getDialogLayout();
  addLayoutRect(
    regions,
    'global_ui',
    'global',
    'dialog',
    'Dialog',
    dialog.region,
    undefined,
    35,
    { ...dialog.region },
  );

  const toast = getToastLayout();
  addLayoutRect(
    regions,
    'global_ui',
    'global',
    'toast',
    'Toast',
    toast.region,
    undefined,
    60,
    { ...toast.region },
  );

  const loading = getLoadingLayout();
  addLayoutRect(
    regions,
    'global_ui',
    'global',
    'loading',
    'Loading',
    loading.region,
    undefined,
    70,
    { ...loading.region },
  );

  return regions;
}

function resolveScreenGroup(pathname: string): EditorScreenId {
  if (pathname.startsWith('/world')) {
    return 'world_map';
  }

  if (pathname.startsWith('/story')) {
    return 'story';
  }

  if (pathname.startsWith('/inventory')) {
    return 'collection';
  }

  return 'global_ui';
}

export function collectEditorRegions(options: CollectOptions): EditorRegion[] {
  const screenGroup = resolveScreenGroup(options.pathname);
  const regions: EditorRegion[] = [];

  if (screenGroup === 'world_map') {
    regions.push(...collectWorldMapRegions());
  }

  if (screenGroup === 'story') {
    regions.push(...collectStoryRegions(options.storySceneId));
  }

  if (screenGroup === 'collection') {
    regions.push(...collectCollectionRegions());
  }

  if (options.showPopup) {
    regions.push(...collectPopupRegions(screenGroup));
  }

  if (options.showGlobalUi) {
    regions.push(...collectGlobalUiRegions());
  }

  return regions.sort((left, right) => left.layer - right.layer);
}

export function getEditorAreaParents(regions: EditorRegion[]) {
  return regions
    .filter((region) => region.type === 'region')
    .map((region) => ({
      id: region.id,
      label: region.label,
      rect: region.rect,
    }));
}
