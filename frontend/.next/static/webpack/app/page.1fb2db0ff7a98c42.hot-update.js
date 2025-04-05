"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.jsx":
/*!**********************!*\
  !*** ./app/page.jsx ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_CesiumGlobe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/CesiumGlobe */ \"(app-pages-browser)/./components/CesiumGlobe.jsx\");\n/* harmony import */ var _components_ChatBot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ChatBot */ \"(app-pages-browser)/./components/ChatBot.jsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    const [isGlobeLoaded, setIsGlobeLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            // Set a timeout to ensure Cesium is fully loaded\n            const timer = setTimeout({\n                \"Home.useEffect.timer\": ()=>{\n                    setIsGlobeLoaded(true);\n                }\n            }[\"Home.useEffect.timer\"], 1000);\n            return ({\n                \"Home.useEffect\": ()=>clearTimeout(timer)\n            })[\"Home.useEffect\"];\n        }\n    }[\"Home.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"relative w-full h-screen overflow-hidden\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                id: \"cesiumContainer\",\n                className: \"absolute top-0 left-0 w-full h-full z-0\",\n                children: isGlobeLoaded && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CesiumGlobe__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                    lineNumber: 23,\n                    columnNumber: 27\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center pointer-events-none\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"container mx-auto px-4\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"max-w-3xl mx-auto\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 pointer-events-auto\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                    className: \"text-4xl font-bold text-center mb-6 text-indigo-900\",\n                                    children: \"Discover Your Perfect Journey\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                                    lineNumber: 31,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-lg text-center mb-8 text-gray-700\",\n                                    children: \"Plan personalized trips with our intelligent travel planner\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                                    lineNumber: 32,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ChatBot__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                                    lineNumber: 35,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                            lineNumber: 30,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                        lineNumber: 29,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                    lineNumber: 28,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\page.jsx\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"19xxYxGwd+h23tkXhe/0lVefcjM=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUUyQztBQUNPO0FBQ1I7QUFFM0IsU0FBU0k7O0lBQ3RCLE1BQU0sQ0FBQ0MsZUFBZUMsaUJBQWlCLEdBQUdMLCtDQUFRQSxDQUFDO0lBRW5ERCxnREFBU0E7MEJBQUM7WUFDUixpREFBaUQ7WUFDakQsTUFBTU8sUUFBUUM7d0NBQVc7b0JBQ3ZCRixpQkFBaUI7Z0JBQ25CO3VDQUFHO1lBRUg7a0NBQU8sSUFBTUcsYUFBYUY7O1FBQzVCO3lCQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0c7UUFBS0MsV0FBVTs7MEJBRWQsOERBQUNDO2dCQUFJQyxJQUFHO2dCQUFrQkYsV0FBVTswQkFDakNOLCtCQUFpQiw4REFBQ0gsK0RBQVdBOzs7Ozs7Ozs7OzBCQUloQyw4REFBQ1U7Z0JBQUlELFdBQVU7MEJBQ2IsNEVBQUNDO29CQUFJRCxXQUFVOzhCQUNiLDRFQUFDQzt3QkFBSUQsV0FBVTtrQ0FDYiw0RUFBQ0M7NEJBQUlELFdBQVU7OzhDQUNiLDhEQUFDRztvQ0FBR0gsV0FBVTs4Q0FBc0Q7Ozs7Ozs4Q0FDcEUsOERBQUNJO29DQUFFSixXQUFVOzhDQUF5Qzs7Ozs7OzhDQUd0RCw4REFBQ1IsMkRBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU90QjtHQW5Dd0JDO0tBQUFBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEpheSBNYW5pc2ggR3VyaVxcT25lRHJpdmVcXERlc2t0b3BcXHB1amFjc1xcZnJvbnRlbmRcXGFwcFxccGFnZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcblxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ2VzaXVtR2xvYmUgZnJvbSBcIkAvY29tcG9uZW50cy9DZXNpdW1HbG9iZVwiXG5pbXBvcnQgQ2hhdEJvdCBmcm9tIFwiQC9jb21wb25lbnRzL0NoYXRCb3RcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbaXNHbG9iZUxvYWRlZCwgc2V0SXNHbG9iZUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFNldCBhIHRpbWVvdXQgdG8gZW5zdXJlIENlc2l1bSBpcyBmdWxseSBsb2FkZWRcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNHbG9iZUxvYWRlZCh0cnVlKVxuICAgIH0sIDEwMDApXG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9LCBbXSlcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLXNjcmVlbiBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHsvKiBHbG9iZSBjb250YWluZXIgKi99XG4gICAgICA8ZGl2IGlkPVwiY2VzaXVtQ29udGFpbmVyXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHctZnVsbCBoLWZ1bGwgei0wXCI+XG4gICAgICAgIHtpc0dsb2JlTG9hZGVkICYmIDxDZXNpdW1HbG9iZSAvPn1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogT3ZlcmxheSBjb250ZW50ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy1mdWxsIGgtZnVsbCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0b1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS84MCBiYWNrZHJvcC1ibHVyLW1kIHJvdW5kZWQtbGcgc2hhZG93LXhsIHAtNiBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC1jZW50ZXIgbWItNiB0ZXh0LWluZGlnby05MDBcIj5EaXNjb3ZlciBZb3VyIFBlcmZlY3QgSm91cm5leTwvaDE+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgdGV4dC1jZW50ZXIgbWItOCB0ZXh0LWdyYXktNzAwXCI+XG4gICAgICAgICAgICAgICAgUGxhbiBwZXJzb25hbGl6ZWQgdHJpcHMgd2l0aCBvdXIgaW50ZWxsaWdlbnQgdHJhdmVsIHBsYW5uZXJcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8Q2hhdEJvdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApXG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDZXNpdW1HbG9iZSIsIkNoYXRCb3QiLCJIb21lIiwiaXNHbG9iZUxvYWRlZCIsInNldElzR2xvYmVMb2FkZWQiLCJ0aW1lciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJtYWluIiwiY2xhc3NOYW1lIiwiZGl2IiwiaWQiLCJoMSIsInAiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.jsx\n"));

/***/ })

});