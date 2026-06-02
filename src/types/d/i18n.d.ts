declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: (key: string, params?: Record<string, any>) => string;
    $tc: (key: string, count?: number, params?: Record<string, any>) => string;
    $te: (key: string) => boolean;
    $d: (value: number | Date, args?: any) => string;
    $n: (value: number, args?: any) => string;
  }
}

export {};
