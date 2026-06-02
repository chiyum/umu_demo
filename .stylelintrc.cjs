module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss"
  ],
  plugins: ["@stylistic/stylelint-plugin"],
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      customSyntax: "postcss-html"
    }
  ],
  ignoreFiles: [
    "node_modules/**",
    "dist/**",
    "build/**",
    "public/**",
    "src/assets/scss/global/reset.scss",
    "src/assets/scss/global/setting.scss",
    "src/assets/tailwind.css",
    "src/quasar-variables.sass"
  ],
  // 自訂規則
  rules: {
    "no-empty-source": null, // 允許空的樣式檔案
    "selector-class-pattern": null, // 關閉 class 命名限制
    "scss/dollar-variable-pattern": null, // 關閉 SCSS 變數命名限制
    "@stylistic/color-hex-case": "lower", // 十六進位顏色小寫
    "color-hex-length": "long", // 十六進位顏色使用完整格式
    "scss/at-extend-no-missing-placeholder": null, // 允許 extend 非 placeholder
    "color-function-alias-notation": null, // 關閉 color 函式別名限制
    "color-function-notation": null, // 關閉 color 函式格式限制
    "alpha-value-notation": "number" // 透明度使用數字
    // 'max-nesting-depth': 4, // 限制巢狀深度
  }
};
