export const useSettingStore = defineStore("setting", () => {
  interface State {
    useTabKeepAliveAction: boolean;
  }
  const state: State = {
    useTabKeepAliveAction: true
  };
  return {
    state
  };
});
