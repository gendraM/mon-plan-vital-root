"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/supabaseClient.js":
/*!*******************************!*\
  !*** ./lib/supabaseClient.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SupabaseProvider: () => (/* binding */ SupabaseProvider),\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   useSupabase: () => (/* binding */ useSupabase)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Initialisation du client Supabase\nconst supabaseUrl = \"https://rvpysxqnomslngxjinge.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cHlzeHFub21zbG5neGppbmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUzMTQsImV4cCI6MjA2MzYxMTMxNH0.msrK6D82Mq6q29Key_A0k6cGg1jqT98O7EnP52Q1wrk\";\nif (!supabaseUrl || !supabaseKey) {\n    console.error('Variables d\\'environnement manquantes :');\n    console.error('NEXT_PUBLIC_SUPABASE_URL =', supabaseUrl);\n    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY =', supabaseKey);\n    throw new Error('Variables NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquantes. Vérifiez le .env.local, la casse, le chemin, et relancez le serveur.');\n}\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__.createClient)(supabaseUrl, supabaseKey);\n// Création d'un contexte pour Supabase\nconst SupabaseContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nconst SupabaseProvider = ({ children })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SupabaseContext.Provider, {\n        value: supabase,\n        children: children\n    }, void 0, false, {\n        fileName: \"/workspaces/mon-plan-vital-root/lib/supabaseClient.js\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, undefined);\n};\n// Hook pour utiliser Supabase dans les composants\nconst useSupabase = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SupabaseContext);\n    if (!context) {\n        throw new Error('useSupabase doit être utilisé dans un SupabaseProvider');\n    }\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9zdXBhYmFzZUNsaWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWtEO0FBQ0c7QUFFckQsb0NBQW9DO0FBQ3BDLE1BQU1HLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxjQUFjSCxrTkFBeUM7QUFDN0QsSUFBSSxDQUFDRCxlQUFlLENBQUNJLGFBQWE7SUFDaENFLFFBQVFDLEtBQUssQ0FBQztJQUNkRCxRQUFRQyxLQUFLLENBQUMsOEJBQThCUDtJQUM1Q00sUUFBUUMsS0FBSyxDQUFDLG1DQUFtQ0g7SUFDakQsTUFBTSxJQUFJSSxNQUFNO0FBQ2xCO0FBQ08sTUFBTUMsV0FBV1YsbUVBQVlBLENBQUNDLGFBQWFJLGFBQWE7QUFFL0QsdUNBQXVDO0FBQ3ZDLE1BQU1NLGdDQUFrQmIsb0RBQWFBLENBQUM7QUFFL0IsTUFBTWMsbUJBQW1CLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQzNDLHFCQUNFLDhEQUFDRixnQkFBZ0JHLFFBQVE7UUFBQ0MsT0FBT0w7a0JBQzlCRzs7Ozs7O0FBR1AsRUFBRTtBQUVGLGtEQUFrRDtBQUMzQyxNQUFNRyxjQUFjO0lBQ3pCLE1BQU1DLFVBQVVsQixpREFBVUEsQ0FBQ1k7SUFDM0IsSUFBSSxDQUFDTSxTQUFTO1FBQ1osTUFBTSxJQUFJUixNQUFNO0lBQ2xCO0lBQ0EsT0FBT1E7QUFDVCxFQUFFIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9tb24tcGxhbi12aXRhbC1yb290L2xpYi9zdXBhYmFzZUNsaWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuLy8gSW5pdGlhbGlzYXRpb24gZHUgY2xpZW50IFN1cGFiYXNlXG5jb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTDtcbmNvbnN0IHN1cGFiYXNlS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUtleSkge1xuICBjb25zb2xlLmVycm9yKCdWYXJpYWJsZXMgZFxcJ2Vudmlyb25uZW1lbnQgbWFucXVhbnRlcyA6Jyk7XG4gIGNvbnNvbGUuZXJyb3IoJ05FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCA9Jywgc3VwYWJhc2VVcmwpO1xuICBjb25zb2xlLmVycm9yKCdORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSA9Jywgc3VwYWJhc2VLZXkpO1xuICB0aHJvdyBuZXcgRXJyb3IoJ1ZhcmlhYmxlcyBORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgb3UgTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkgbWFucXVhbnRlcy4gVsOpcmlmaWV6IGxlIC5lbnYubG9jYWwsIGxhIGNhc3NlLCBsZSBjaGVtaW4sIGV0IHJlbGFuY2V6IGxlIHNlcnZldXIuJyk7XG59XG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5KTtcblxuLy8gQ3LDqWF0aW9uIGQndW4gY29udGV4dGUgcG91ciBTdXBhYmFzZVxuY29uc3QgU3VwYWJhc2VDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuZXhwb3J0IGNvbnN0IFN1cGFiYXNlUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN1cGFiYXNlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c3VwYWJhc2V9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvU3VwYWJhc2VDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcblxuLy8gSG9vayBwb3VyIHV0aWxpc2VyIFN1cGFiYXNlIGRhbnMgbGVzIGNvbXBvc2FudHNcbmV4cG9ydCBjb25zdCB1c2VTdXBhYmFzZSA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoU3VwYWJhc2VDb250ZXh0KTtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VTdXBhYmFzZSBkb2l0IMOqdHJlIHV0aWxpc8OpIGRhbnMgdW4gU3VwYWJhc2VQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsInN1cGFiYXNlIiwiU3VwYWJhc2VDb250ZXh0IiwiU3VwYWJhc2VQcm92aWRlciIsImNoaWxkcmVuIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZVN1cGFiYXNlIiwiY29udGV4dCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/supabaseClient.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/supabaseClient */ \"(pages-dir-node)/./lib/supabaseClient.js\");\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__.SupabaseProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/workspaces/mon-plan-vital-root/pages/_app.js\",\n            lineNumber: 6,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/mon-plan-vital-root/pages/_app.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBeUQ7QUFFekQsU0FBU0MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNyQyxxQkFDRSw4REFBQ0gsaUVBQWdCQTtrQkFDZiw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QjtBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9tb24tcGxhbi12aXRhbC1yb290L3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VwYWJhc2VQcm92aWRlciB9IGZyb20gJy4uL2xpYi9zdXBhYmFzZUNsaWVudCc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxTdXBhYmFzZVByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvU3VwYWJhc2VQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiU3VwYWJhc2VQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.js"));
module.exports = __webpack_exports__;

})();