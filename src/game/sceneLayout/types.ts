/**
 * Scene Layout — формат визуальной разметки сцены.
 * Не зависит от StoryEngine. Движок читает только готовые hotspot-данные через адаптер.
 */

export type SceneObjectType =
  | 'hotspot'
  | 'item'
  | 'npc'
  | 'effect'
  | 'dialog'
  | 'reward';

export type SceneCoordinateSpace = 'illustration' | 'screen';

export type SceneObjectShape =
  | { type: 'rectangle' }
  | { type: 'ellipse' }
  | { type: 'polygon'; points: Array<{ x: number; y: number }> }
  | { type: 'customPath'; d: string };

export type SceneObjectAction = 'navigate' | 'dialog' | 'locked';

export type SceneObject = {
  id: string;
  type: SceneObjectType;
  label: string;
  shape: SceneObjectShape;
  space: SceneCoordinateSpace;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  zIndex: number;
  animation: string[];
  cursor: string;
  tooltip: string;
  visible: boolean;
  locked: boolean;
  primary?: boolean;
  action?: SceneObjectAction;
  nextScene?: string;
  dialog?: string;
  lockedMessage?: string;
};

export type SceneFlowAction = {
  id: string;
  label: string;
  nextScene: string;
};

export type SceneFlow = {
  actions?: SceneFlowAction[];
  autoNavigate?: string;
  silentReward?: string;
  earlyHotspots?: boolean;
  ending?: boolean;
};

export type SceneLayout = {
  version: 1;
  sceneId: string;
  storyId: string;
  projectId: string;
  objects: SceneObject[];
  flow?: SceneFlow;
};
