import uiLayoutSource from '../../../docs/UI_LAYOUT.md?raw';
import { extractLayoutJson } from '@/game/layout/parseUiLayout';
import type { GlobalUILayout } from '@/game/ui/types';

const globalUiLayout = extractLayoutJson<GlobalUILayout>(uiLayoutSource, 'global_ui');

export function getGlobalUILayout(): GlobalUILayout {
  return globalUiLayout;
}

export function getGlobalRules(): string[] {
  return globalUiLayout.rules;
}

export function getGlobalSafeZone() {
  return globalUiLayout.globalSafeZone;
}

export function getTopBarLayout() {
  return globalUiLayout.topBar;
}

export function getBottomMenuLayout() {
  return globalUiLayout.bottomMenu;
}

export function getPopupLayout() {
  return globalUiLayout.popup;
}

export function getDialogLayout() {
  return globalUiLayout.dialog;
}

export function getToastLayout() {
  return globalUiLayout.toast;
}

export function getLoadingLayout() {
  return globalUiLayout.loading;
}
