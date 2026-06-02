import type { Component } from "vue";

/**
 * Theme 系統的型別定義
 *
 * 設計理念：
 * - layoutKey：版面骨架（決定整體區塊組合與視覺主結構，例如 noya / at99）
 * - colorKey：色彩變體（在同一版面下可以切換配色，例如 noya 預設 / 日落橘 / 青檸綠）
 * - layout 與 color 解耦：同一個版面可以套用該版面下定義的任一配色
 *
 * 為什麼用 lazy import：避免所有版面 chunk 一次塞進主 bundle，
 * 切換版面才下載對應檔案，後續切回 module cache 拿。
 */

/** 動態載入的 Vue 元件型別 */
export type AsyncVueComponent = () => Promise<{ default: Component }>;

/**
 * 配色變體
 * - key：CSS 上會寫成 data-theme-color="<key>"，由 _variants.scss 對應定義 CSS var
 * - label：給 FAB 切換器顯示用，i18n 可後續再接
 * - swatch：顯示在 FAB 配色按鈕內的代表色，方便辨識
 */
export interface ColorVariant {
  key: string;
  label: string;
  swatch: string;
}

/**
 * Theme（版面）的 metadata
 *
 * - key：路由 query / localStorage / data-theme 屬性都用這個
 * - desktop / mobile：兩個入口元件，由 home host 依 useDevice 動態切
 * - defaultColor：未指定 colorKey 時的預設值
 * - colors：本版面支援的所有配色
 */
export interface ThemeMeta {
  key: string;
  label: string;
  desktop: AsyncVueComponent;
  mobile: AsyncVueComponent;
  defaultColor: string;
  colors: ColorVariant[];
}

/**
 * Section 元件對應表（保留型別，未來若想抽出更細粒度的「插槽組合」可用）
 *
 * 目前 noya / at99 版面內部直接 import 自己的 sections，不走這層 indirection；
 * 此型別保留是因為使用者規格書有列，留作擴充點。
 */
export type SlotComponentMap = Record<string, AsyncVueComponent>;

/** FAB 浮標位置（百分比，相對視窗，方便縮放後位置不失真） */
export interface FabPosition {
  /** 0 ~ 1，相對 viewport 寬 */
  xRatio: number;
  /** 0 ~ 1，相對 viewport 高 */
  yRatio: number;
  /** 吸附邊（拖到邊緣自動吸附後標記） */
  edge: "left" | "right" | "top" | "bottom" | null;
}
