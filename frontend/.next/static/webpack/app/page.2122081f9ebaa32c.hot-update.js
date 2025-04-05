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

/***/ "(app-pages-browser)/./components/CesiumGlobe.jsx":
/*!************************************!*\
  !*** ./components/CesiumGlobe.jsx ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CesiumGlobe)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nfunction CesiumGlobe() {\n    _s();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"CesiumGlobe.useEffect\": ()=>{\n            // Make sure Cesium is loaded\n            if ( false || !window.Cesium) {\n                console.error(\"Cesium is not loaded\");\n                return;\n            }\n            const Cesium = window.Cesium;\n            // Your Cesium token should be set here\n            Cesium.Ion.defaultAccessToken = \"\";\n            // Initialize the Cesium viewer\n            const viewer = new Cesium.Viewer(\"cesiumContainer\", {\n                terrain: Cesium.Terrain.fromWorldTerrain(),\n                animation: false,\n                baseLayerPicker: false,\n                fullscreenButton: false,\n                geocoder: false,\n                homeButton: false,\n                infoBox: false,\n                sceneModePicker: false,\n                selectionIndicator: false,\n                timeline: false,\n                navigationHelpButton: false,\n                navigationInstructionsInitiallyVisible: false,\n                imageryProvider: new Cesium.IonImageryProvider({\n                    assetId: 3\n                })\n            });\n            // Remove the Cesium logo and credits container\n            viewer.cesiumWidget.creditContainer.style.display = \"none\";\n            // Set the initial camera to look at Earth\n            viewer.scene.camera.setView({\n                destination: Cesium.Cartesian3.fromDegrees(10.0, 45.0, 10000000.0),\n                orientation: {\n                    heading: Cesium.Math.toRadians(0),\n                    pitch: Cesium.Math.toRadians(-90)\n                }\n            });\n            // Add Cesium OSM buildings to the scene\n            async function addOsmBuildings() {\n                try {\n                    const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();\n                    viewer.scene.primitives.add(osmBuildingsTileset);\n                } catch (error) {\n                    console.error(\"Error loading OSM Buildings:\", error);\n                }\n            }\n            addOsmBuildings();\n            // Add auto-rotation for the globe\n            viewer.clock.onTick.addEventListener({\n                \"CesiumGlobe.useEffect\": ()=>{\n                    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0005);\n                }\n            }[\"CesiumGlobe.useEffect\"]);\n            // Cleanup function\n            return ({\n                \"CesiumGlobe.useEffect\": ()=>{\n                    if (viewer && !viewer.isDestroyed()) {\n                        viewer.destroy();\n                    }\n                }\n            })[\"CesiumGlobe.useEffect\"];\n        }\n    }[\"CesiumGlobe.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        id: \"cesiumContainer\",\n        style: {\n            width: \"100%\",\n            height: \"100vh\"\n        }\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\components\\\\CesiumGlobe.jsx\",\n        lineNumber: 72,\n        columnNumber: 10\n    }, this);\n}\n_s(CesiumGlobe, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = CesiumGlobe;\nvar _c;\n$RefreshReg$(_c, \"CesiumGlobe\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvQ2VzaXVtR2xvYmUuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVpQztBQUVsQixTQUFTQzs7SUFDdEJELGdEQUFTQTtpQ0FBQztZQUNSLDZCQUE2QjtZQUM3QixJQUFJLE1BQTZCLElBQUksQ0FBQ0UsT0FBT0MsTUFBTSxFQUFFO2dCQUNuREMsUUFBUUMsS0FBSyxDQUFDO2dCQUNkO1lBQ0Y7WUFFQSxNQUFNRixTQUFTRCxPQUFPQyxNQUFNO1lBRTVCLHVDQUF1QztZQUN2Q0EsT0FBT0csR0FBRyxDQUFDQyxrQkFBa0IsR0FDM0I7WUFDRiwrQkFBK0I7WUFDL0IsTUFBTUMsU0FBUyxJQUFJTCxPQUFPTSxNQUFNLENBQUMsbUJBQW1CO2dCQUNsREMsU0FBU1AsT0FBT1EsT0FBTyxDQUFDQyxnQkFBZ0I7Z0JBQ3hDQyxXQUFXO2dCQUNYQyxpQkFBaUI7Z0JBQ2pCQyxrQkFBa0I7Z0JBQ2xCQyxVQUFVO2dCQUNWQyxZQUFZO2dCQUNaQyxTQUFTO2dCQUNUQyxpQkFBaUI7Z0JBQ2pCQyxvQkFBb0I7Z0JBQ3BCQyxVQUFVO2dCQUNWQyxzQkFBc0I7Z0JBQ3RCQyx3Q0FBd0M7Z0JBQ3hDQyxpQkFBaUIsSUFBSXJCLE9BQU9zQixrQkFBa0IsQ0FBQztvQkFBRUMsU0FBUztnQkFBRTtZQUM5RDtZQUVBLCtDQUErQztZQUMvQ2xCLE9BQU9tQixZQUFZLENBQUNDLGVBQWUsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLEdBQUc7WUFFcEQsMENBQTBDO1lBQzFDdEIsT0FBT3VCLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPLENBQUM7Z0JBQzFCQyxhQUFhL0IsT0FBT2dDLFVBQVUsQ0FBQ0MsV0FBVyxDQUFDLE1BQU0sTUFBTTtnQkFDdkRDLGFBQWE7b0JBQ1hDLFNBQVNuQyxPQUFPb0MsSUFBSSxDQUFDQyxTQUFTLENBQUM7b0JBQy9CQyxPQUFPdEMsT0FBT29DLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDO1lBQ0Y7WUFFQSx3Q0FBd0M7WUFDeEMsZUFBZUU7Z0JBQ2IsSUFBSTtvQkFDRixNQUFNQyxzQkFBc0IsTUFBTXhDLE9BQU95Qyx1QkFBdUI7b0JBQ2hFcEMsT0FBT3VCLEtBQUssQ0FBQ2MsVUFBVSxDQUFDQyxHQUFHLENBQUNIO2dCQUM5QixFQUFFLE9BQU90QyxPQUFPO29CQUNkRCxRQUFRQyxLQUFLLENBQUMsZ0NBQWdDQTtnQkFDaEQ7WUFDRjtZQUVBcUM7WUFFQSxrQ0FBa0M7WUFDbENsQyxPQUFPdUMsS0FBSyxDQUFDQyxNQUFNLENBQUNDLGdCQUFnQjt5Q0FBQztvQkFDbkN6QyxPQUFPdUIsS0FBSyxDQUFDQyxNQUFNLENBQUNrQixNQUFNLENBQUMvQyxPQUFPZ0MsVUFBVSxDQUFDZ0IsTUFBTSxFQUFFO2dCQUN2RDs7WUFFQSxtQkFBbUI7WUFDbkI7eUNBQU87b0JBQ0wsSUFBSTNDLFVBQVUsQ0FBQ0EsT0FBTzRDLFdBQVcsSUFBSTt3QkFDbkM1QyxPQUFPNkMsT0FBTztvQkFDaEI7Z0JBQ0Y7O1FBQ0Y7Z0NBQUcsRUFBRTtJQUVMLHFCQUFPLDhEQUFDQztRQUFJQyxJQUFHO1FBQWtCMUIsT0FBTztZQUFFMkIsT0FBTztZQUFRQyxRQUFRO1FBQVE7Ozs7OztBQUMzRTtHQXBFd0J4RDtLQUFBQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxKYXkgTWFuaXNoIEd1cmlcXE9uZURyaXZlXFxEZXNrdG9wXFxwdWphY3NcXGZyb250ZW5kXFxjb21wb25lbnRzXFxDZXNpdW1HbG9iZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcclxuXHJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDZXNpdW1HbG9iZSgpIHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gTWFrZSBzdXJlIENlc2l1bSBpcyBsb2FkZWRcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cuQ2VzaXVtKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDZXNpdW0gaXMgbm90IGxvYWRlZFwiKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBDZXNpdW0gPSB3aW5kb3cuQ2VzaXVtXHJcblxyXG4gICAgLy8gWW91ciBDZXNpdW0gdG9rZW4gc2hvdWxkIGJlIHNldCBoZXJlXHJcbiAgICBDZXNpdW0uSW9uLmRlZmF1bHRBY2Nlc3NUb2tlbiA9XHJcbiAgICAgIFwiXCJcclxuICAgIC8vIEluaXRpYWxpemUgdGhlIENlc2l1bSB2aWV3ZXJcclxuICAgIGNvbnN0IHZpZXdlciA9IG5ldyBDZXNpdW0uVmlld2VyKFwiY2VzaXVtQ29udGFpbmVyXCIsIHtcclxuICAgICAgdGVycmFpbjogQ2VzaXVtLlRlcnJhaW4uZnJvbVdvcmxkVGVycmFpbigpLFxyXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICBiYXNlTGF5ZXJQaWNrZXI6IGZhbHNlLFxyXG4gICAgICBmdWxsc2NyZWVuQnV0dG9uOiBmYWxzZSxcclxuICAgICAgZ2VvY29kZXI6IGZhbHNlLFxyXG4gICAgICBob21lQnV0dG9uOiBmYWxzZSxcclxuICAgICAgaW5mb0JveDogZmFsc2UsXHJcbiAgICAgIHNjZW5lTW9kZVBpY2tlcjogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGlvbkluZGljYXRvcjogZmFsc2UsXHJcbiAgICAgIHRpbWVsaW5lOiBmYWxzZSxcclxuICAgICAgbmF2aWdhdGlvbkhlbHBCdXR0b246IGZhbHNlLFxyXG4gICAgICBuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb25zSW5pdGlhbGx5VmlzaWJsZTogZmFsc2UsXHJcbiAgICAgIGltYWdlcnlQcm92aWRlcjogbmV3IENlc2l1bS5Jb25JbWFnZXJ5UHJvdmlkZXIoeyBhc3NldElkOiAzIH0pLCAvLyBOYXR1cmFsIEVhcnRoIElJXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgQ2VzaXVtIGxvZ28gYW5kIGNyZWRpdHMgY29udGFpbmVyXHJcbiAgICB2aWV3ZXIuY2VzaXVtV2lkZ2V0LmNyZWRpdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuXHJcbiAgICAvLyBTZXQgdGhlIGluaXRpYWwgY2FtZXJhIHRvIGxvb2sgYXQgRWFydGhcclxuICAgIHZpZXdlci5zY2VuZS5jYW1lcmEuc2V0Vmlldyh7XHJcbiAgICAgIGRlc3RpbmF0aW9uOiBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlcygxMC4wLCA0NS4wLCAxMDAwMDAwMC4wKSxcclxuICAgICAgb3JpZW50YXRpb246IHtcclxuICAgICAgICBoZWFkaW5nOiBDZXNpdW0uTWF0aC50b1JhZGlhbnMoMCksXHJcbiAgICAgICAgcGl0Y2g6IENlc2l1bS5NYXRoLnRvUmFkaWFucygtOTApLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBBZGQgQ2VzaXVtIE9TTSBidWlsZGluZ3MgdG8gdGhlIHNjZW5lXHJcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRPc21CdWlsZGluZ3MoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb3NtQnVpbGRpbmdzVGlsZXNldCA9IGF3YWl0IENlc2l1bS5jcmVhdGVPc21CdWlsZGluZ3NBc3luYygpXHJcbiAgICAgICAgdmlld2VyLnNjZW5lLnByaW1pdGl2ZXMuYWRkKG9zbUJ1aWxkaW5nc1RpbGVzZXQpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGxvYWRpbmcgT1NNIEJ1aWxkaW5nczpcIiwgZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRPc21CdWlsZGluZ3MoKVxyXG5cclxuICAgIC8vIEFkZCBhdXRvLXJvdGF0aW9uIGZvciB0aGUgZ2xvYmVcclxuICAgIHZpZXdlci5jbG9jay5vblRpY2suYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgIHZpZXdlci5zY2VuZS5jYW1lcmEucm90YXRlKENlc2l1bS5DYXJ0ZXNpYW4zLlVOSVRfWiwgMC4wMDA1KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBDbGVhbnVwIGZ1bmN0aW9uXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAodmlld2VyICYmICF2aWV3ZXIuaXNEZXN0cm95ZWQoKSkge1xyXG4gICAgICAgIHZpZXdlci5kZXN0cm95KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFtdKVxyXG5cclxuICByZXR1cm4gPGRpdiBpZD1cImNlc2l1bUNvbnRhaW5lclwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMHZoXCIgfX0+PC9kaXY+XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJDZXNpdW1HbG9iZSIsIndpbmRvdyIsIkNlc2l1bSIsImNvbnNvbGUiLCJlcnJvciIsIklvbiIsImRlZmF1bHRBY2Nlc3NUb2tlbiIsInZpZXdlciIsIlZpZXdlciIsInRlcnJhaW4iLCJUZXJyYWluIiwiZnJvbVdvcmxkVGVycmFpbiIsImFuaW1hdGlvbiIsImJhc2VMYXllclBpY2tlciIsImZ1bGxzY3JlZW5CdXR0b24iLCJnZW9jb2RlciIsImhvbWVCdXR0b24iLCJpbmZvQm94Iiwic2NlbmVNb2RlUGlja2VyIiwic2VsZWN0aW9uSW5kaWNhdG9yIiwidGltZWxpbmUiLCJuYXZpZ2F0aW9uSGVscEJ1dHRvbiIsIm5hdmlnYXRpb25JbnN0cnVjdGlvbnNJbml0aWFsbHlWaXNpYmxlIiwiaW1hZ2VyeVByb3ZpZGVyIiwiSW9uSW1hZ2VyeVByb3ZpZGVyIiwiYXNzZXRJZCIsImNlc2l1bVdpZGdldCIsImNyZWRpdENvbnRhaW5lciIsInN0eWxlIiwiZGlzcGxheSIsInNjZW5lIiwiY2FtZXJhIiwic2V0VmlldyIsImRlc3RpbmF0aW9uIiwiQ2FydGVzaWFuMyIsImZyb21EZWdyZWVzIiwib3JpZW50YXRpb24iLCJoZWFkaW5nIiwiTWF0aCIsInRvUmFkaWFucyIsInBpdGNoIiwiYWRkT3NtQnVpbGRpbmdzIiwib3NtQnVpbGRpbmdzVGlsZXNldCIsImNyZWF0ZU9zbUJ1aWxkaW5nc0FzeW5jIiwicHJpbWl0aXZlcyIsImFkZCIsImNsb2NrIiwib25UaWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdGF0ZSIsIlVOSVRfWiIsImlzRGVzdHJveWVkIiwiZGVzdHJveSIsImRpdiIsImlkIiwid2lkdGgiLCJoZWlnaHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/CesiumGlobe.jsx\n"));

/***/ })

});