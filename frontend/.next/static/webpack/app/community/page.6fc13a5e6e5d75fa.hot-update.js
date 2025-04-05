"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/community/page",{

/***/ "(app-pages-browser)/./app/community/page.jsx":
/*!********************************!*\
  !*** ./app/community/page.jsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Community)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Card */ \"(app-pages-browser)/./components/Card.jsx\");\n/* harmony import */ var _components_FilterSidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/FilterSidebar */ \"(app-pages-browser)/./components/FilterSidebar.jsx\");\n/* harmony import */ var _components_AuroraBackground__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/AuroraBackground */ \"(app-pages-browser)/./components/AuroraBackground.jsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Community() {\n    _s();\n    // Sample destinations array\n    const sampleDestinations = [\n        {\n            name: \"Manali Adventure Trip\",\n            location: \"Manali, Himachal Pradesh\",\n            description: \"Experience the thrill of the Himalayas with a group of adventure enthusiasts. Trek through scenic trails, enjoy river rafting, and explore local culture in this 7-day expedition.\",\n            image: \"/images/manali.jpg\",\n            currentPeople: 12,\n            maxPeople: 16,\n            transport: \"Bus\",\n            budget: \"Classic Travel\",\n            ageGroup: \"Young (20-30s)\",\n            price: 15999\n        },\n        {\n            name: \"Goa Beach Retreat\",\n            location: \"North Goa\",\n            description: \"Relax on pristine beaches, enjoy water sports and experience the vibrant nightlife in this 5-day getaway to Goa.\",\n            image: \"/images/goa.jpg\",\n            currentPeople: 8,\n            maxPeople: 12,\n            transport: \"Flight\",\n            budget: \"Budget Travel\",\n            ageGroup: \"Young (20-30s)\",\n            price: 12499\n        },\n        {\n            name: \"Kerala Backwaters Tour\",\n            location: \"Alleppey, Kerala\",\n            description: \"Experience the serene backwaters of Kerala on a houseboat, explore spice plantations and enjoy authentic Kerala cuisine.\",\n            image: \"/images/kerala.jpg\",\n            currentPeople: 6,\n            maxPeople: 10,\n            transport: \"Train\",\n            budget: \"Luxury Travel\",\n            ageGroup: \"Middle-aged (30-50s)\",\n            price: 22999\n        },\n        {\n            name: \"Rajasthan Heritage Tour\",\n            location: \"Jaipur, Udaipur, Jodhpur\",\n            description: \"Explore the royal heritage of Rajasthan by visiting magnificent forts, palaces and experiencing the rich culture and cuisine.\",\n            image: \"/images/rajasthan.jpg\",\n            currentPeople: 15,\n            maxPeople: 20,\n            transport: \"Train\",\n            budget: \"Classic Travel\",\n            ageGroup: \"Family Friendly\",\n            price: 18500\n        }\n    ];\n    // State to store filtered destinations\n    const [filteredDestinations, setFilteredDestinations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(sampleDestinations);\n    // Pagination state\n    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const itemsPerPage = 12;\n    // Handle filter changes\n    const handleFilterChange = (filters)=>{\n        // Filter destinations based on selected criteria\n        const filtered = sampleDestinations.filter((destination)=>{\n            // Check transport filter\n            const transportMatch = filters.transport.length === 0 || filters.transport.includes(destination.transport);\n            // Check budget filter\n            const budgetMatch = filters.budget.length === 0 || filters.budget.includes(destination.budget);\n            // Check age group filter\n            const ageGroupMatch = filters.ageGroup.length === 0 || filters.ageGroup.includes(destination.ageGroup);\n            // Check price range\n            const priceMatch = destination.price >= filters.minPrice && destination.price <= filters.maxPrice;\n            // Return true if all conditions match\n            return transportMatch && budgetMatch && ageGroupMatch && priceMatch;\n        });\n        setFilteredDestinations(filtered);\n        setCurrentPage(1) // Reset to the first page when filters change\n        ;\n    };\n    // Pagination logic\n    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);\n    const paginatedDestinations = filteredDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);\n    const handlePageChange = (page)=>{\n        setCurrentPage(page);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AuroraBackground__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        className: \"bg-black text-white\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto px-4 py-20 min-h-screen\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-4xl font-bold mb-6\",\n                    children: \"Community\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                    lineNumber: 107,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col md:flex-row gap-8\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full md:w-1/4\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_FilterSidebar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                onFilterChange: handleFilterChange\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                lineNumber: 112,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                            lineNumber: 111,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex-grow md:w-3/4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: \"text-2xl font-bold mb-6\",\n                                    children: \"Available Trips\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                    lineNumber: 117,\n                                    columnNumber: 13\n                                }, this),\n                                paginatedDestinations.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                                    children: paginatedDestinations.map((destination, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Card__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                            destination: destination\n                                        }, index, false, {\n                                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                            lineNumber: 122,\n                                            columnNumber: 19\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                    lineNumber: 120,\n                                    columnNumber: 15\n                                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"text-center py-10\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-lg text-gray-300\",\n                                            children: \"No destinations match your filters.\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                            lineNumber: 127,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"mt-2 text-gray-400\",\n                                            children: \"Try adjusting your filters to see more options.\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                            lineNumber: 128,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                    lineNumber: 126,\n                                    columnNumber: 15\n                                }, this),\n                                totalPages > 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex justify-center items-center mt-6 space-x-2\",\n                                    children: Array.from({\n                                        length: totalPages\n                                    }, (_, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: ()=>handlePageChange(index + 1),\n                                            className: \"px-4 py-2 rounded \".concat(currentPage === index + 1 ? \"bg-blue-500 text-white\" : \"bg-gray-700 text-gray-300 hover:bg-gray-600\"),\n                                            children: index + 1\n                                        }, index, false, {\n                                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                            lineNumber: 136,\n                                            columnNumber: 19\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                    lineNumber: 134,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-lg mt-10 mb-10\",\n                                    children: \"Join our growing community of travel enthusiasts and make your next trip unforgettable!\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                                    lineNumber: 151,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                            lineNumber: 116,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n                    lineNumber: 109,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n            lineNumber: 106,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Jay Manish Guri\\\\OneDrive\\\\Desktop\\\\pujacs\\\\frontend\\\\app\\\\community\\\\page.jsx\",\n        lineNumber: 105,\n        columnNumber: 5\n    }, this);\n}\n_s(Community, \"b4XdMXwt7S5NyGFn1DxVhXbdou0=\");\n_c = Community;\nvar _c;\n$RefreshReg$(_c, \"Community\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21tdW5pdHkvcGFnZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRWdDO0FBQ2U7QUFDTztBQUNNO0FBRTdDLFNBQVNJOztJQUN0Qiw0QkFBNEI7SUFDNUIsTUFBTUMscUJBQXFCO1FBQ3pCO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWQyxhQUNFO1lBQ0ZDLE9BQU87WUFDUEMsZUFBZTtZQUNmQyxXQUFXO1lBQ1hDLFdBQVc7WUFDWEMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLE9BQU87UUFDVDtRQUNBO1lBQ0VULE1BQU07WUFDTkMsVUFBVTtZQUNWQyxhQUNFO1lBQ0ZDLE9BQU87WUFDUEMsZUFBZTtZQUNmQyxXQUFXO1lBQ1hDLFdBQVc7WUFDWEMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLE9BQU87UUFDVDtRQUNBO1lBQ0VULE1BQU07WUFDTkMsVUFBVTtZQUNWQyxhQUNFO1lBQ0ZDLE9BQU87WUFDUEMsZUFBZTtZQUNmQyxXQUFXO1lBQ1hDLFdBQVc7WUFDWEMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLE9BQU87UUFDVDtRQUNBO1lBQ0VULE1BQU07WUFDTkMsVUFBVTtZQUNWQyxhQUNFO1lBQ0ZDLE9BQU87WUFDUEMsZUFBZTtZQUNmQyxXQUFXO1lBQ1hDLFdBQVc7WUFDWEMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLE9BQU87UUFDVDtLQUNEO0lBRUQsdUNBQXVDO0lBQ3ZDLE1BQU0sQ0FBQ0Msc0JBQXNCQyx3QkFBd0IsR0FBR2pCLCtDQUFRQSxDQUFDSztJQUVqRSxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDYSxhQUFhQyxlQUFlLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNb0IsZUFBZTtJQUVyQix3QkFBd0I7SUFDeEIsTUFBTUMscUJBQXFCLENBQUNDO1FBQzFCLGlEQUFpRDtRQUNqRCxNQUFNQyxXQUFXbEIsbUJBQW1CbUIsTUFBTSxDQUFDLENBQUNDO1lBQzFDLHlCQUF5QjtZQUN6QixNQUFNQyxpQkFBaUJKLFFBQVFWLFNBQVMsQ0FBQ2UsTUFBTSxLQUFLLEtBQUtMLFFBQVFWLFNBQVMsQ0FBQ2dCLFFBQVEsQ0FBQ0gsWUFBWWIsU0FBUztZQUV6RyxzQkFBc0I7WUFDdEIsTUFBTWlCLGNBQWNQLFFBQVFULE1BQU0sQ0FBQ2MsTUFBTSxLQUFLLEtBQUtMLFFBQVFULE1BQU0sQ0FBQ2UsUUFBUSxDQUFDSCxZQUFZWixNQUFNO1lBRTdGLHlCQUF5QjtZQUN6QixNQUFNaUIsZ0JBQWdCUixRQUFRUixRQUFRLENBQUNhLE1BQU0sS0FBSyxLQUFLTCxRQUFRUixRQUFRLENBQUNjLFFBQVEsQ0FBQ0gsWUFBWVgsUUFBUTtZQUVyRyxvQkFBb0I7WUFDcEIsTUFBTWlCLGFBQWFOLFlBQVlWLEtBQUssSUFBSU8sUUFBUVUsUUFBUSxJQUFJUCxZQUFZVixLQUFLLElBQUlPLFFBQVFXLFFBQVE7WUFFakcsc0NBQXNDO1lBQ3RDLE9BQU9QLGtCQUFrQkcsZUFBZUMsaUJBQWlCQztRQUMzRDtRQUVBZCx3QkFBd0JNO1FBQ3hCSixlQUFlLEdBQUcsOENBQThDOztJQUNsRTtJQUVBLG1CQUFtQjtJQUNuQixNQUFNZSxhQUFhQyxLQUFLQyxJQUFJLENBQUNwQixxQkFBcUJXLE1BQU0sR0FBR1A7SUFDM0QsTUFBTWlCLHdCQUF3QnJCLHFCQUFxQnNCLEtBQUssQ0FBQyxDQUFDcEIsY0FBYyxLQUFLRSxjQUFjRixjQUFjRTtJQUV6RyxNQUFNbUIsbUJBQW1CLENBQUNDO1FBQ3hCckIsZUFBZXFCO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNyQyxvRUFBZ0JBO1FBQUNzQyxXQUFVO2tCQUMxQiw0RUFBQ0M7WUFBSUQsV0FBVTs7OEJBQ2IsOERBQUNFO29CQUFHRixXQUFVOzhCQUEwQjs7Ozs7OzhCQUV4Qyw4REFBQ0M7b0JBQUlELFdBQVU7O3NDQUViLDhEQUFDQzs0QkFBSUQsV0FBVTtzQ0FDYiw0RUFBQ3ZDLGlFQUFhQTtnQ0FBQzBDLGdCQUFnQnZCOzs7Ozs7Ozs7OztzQ0FJakMsOERBQUNxQjs0QkFBSUQsV0FBVTs7OENBQ2IsOERBQUNJO29DQUFHSixXQUFVOzhDQUEwQjs7Ozs7O2dDQUV2Q0osc0JBQXNCVixNQUFNLEdBQUcsa0JBQzlCLDhEQUFDZTtvQ0FBSUQsV0FBVTs4Q0FDWkosc0JBQXNCUyxHQUFHLENBQUMsQ0FBQ3JCLGFBQWFzQixzQkFDdkMsOERBQUM5Qyx3REFBZUE7NENBQWF3QixhQUFhQTsyQ0FBcEJzQjs7Ozs7Ozs7O3lEQUkxQiw4REFBQ0w7b0NBQUlELFdBQVU7O3NEQUNiLDhEQUFDTzs0Q0FBRVAsV0FBVTtzREFBd0I7Ozs7OztzREFDckMsOERBQUNPOzRDQUFFUCxXQUFVO3NEQUFxQjs7Ozs7Ozs7Ozs7O2dDQUtyQ1AsYUFBYSxtQkFDWiw4REFBQ1E7b0NBQUlELFdBQVU7OENBQ1pRLE1BQU1DLElBQUksQ0FBQzt3Q0FBRXZCLFFBQVFPO29DQUFXLEdBQUcsQ0FBQ2lCLEdBQUdKLHNCQUN0Qyw4REFBQ0s7NENBRUNDLFNBQVMsSUFBTWQsaUJBQWlCUSxRQUFROzRDQUN4Q04sV0FBVyxxQkFJVixPQUhDdkIsZ0JBQWdCNkIsUUFBUSxJQUNwQiwyQkFDQTtzREFHTEEsUUFBUTsyQ0FSSkE7Ozs7Ozs7Ozs7OENBY2IsOERBQUNDO29DQUFFUCxXQUFVOzhDQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRL0M7R0F2SndCckM7S0FBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSmF5IE1hbmlzaCBHdXJpXFxPbmVEcml2ZVxcRGVza3RvcFxccHVqYWNzXFxmcm9udGVuZFxcYXBwXFxjb21tdW5pdHlcXHBhZ2UuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBEZXN0aW5hdGlvbkNhcmQgZnJvbSBcIkAvY29tcG9uZW50cy9DYXJkXCJcbmltcG9ydCBGaWx0ZXJTaWRlYmFyIGZyb20gXCJAL2NvbXBvbmVudHMvRmlsdGVyU2lkZWJhclwiXG5pbXBvcnQgQXVyb3JhQmFja2dyb3VuZCBmcm9tIFwiQC9jb21wb25lbnRzL0F1cm9yYUJhY2tncm91bmRcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tdW5pdHkoKSB7XG4gIC8vIFNhbXBsZSBkZXN0aW5hdGlvbnMgYXJyYXlcbiAgY29uc3Qgc2FtcGxlRGVzdGluYXRpb25zID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiTWFuYWxpIEFkdmVudHVyZSBUcmlwXCIsXG4gICAgICBsb2NhdGlvbjogXCJNYW5hbGksIEhpbWFjaGFsIFByYWRlc2hcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIkV4cGVyaWVuY2UgdGhlIHRocmlsbCBvZiB0aGUgSGltYWxheWFzIHdpdGggYSBncm91cCBvZiBhZHZlbnR1cmUgZW50aHVzaWFzdHMuIFRyZWsgdGhyb3VnaCBzY2VuaWMgdHJhaWxzLCBlbmpveSByaXZlciByYWZ0aW5nLCBhbmQgZXhwbG9yZSBsb2NhbCBjdWx0dXJlIGluIHRoaXMgNy1kYXkgZXhwZWRpdGlvbi5cIixcbiAgICAgIGltYWdlOiBcIi9pbWFnZXMvbWFuYWxpLmpwZ1wiLFxuICAgICAgY3VycmVudFBlb3BsZTogMTIsXG4gICAgICBtYXhQZW9wbGU6IDE2LFxuICAgICAgdHJhbnNwb3J0OiBcIkJ1c1wiLFxuICAgICAgYnVkZ2V0OiBcIkNsYXNzaWMgVHJhdmVsXCIsXG4gICAgICBhZ2VHcm91cDogXCJZb3VuZyAoMjAtMzBzKVwiLFxuICAgICAgcHJpY2U6IDE1OTk5LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJHb2EgQmVhY2ggUmV0cmVhdFwiLFxuICAgICAgbG9jYXRpb246IFwiTm9ydGggR29hXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJSZWxheCBvbiBwcmlzdGluZSBiZWFjaGVzLCBlbmpveSB3YXRlciBzcG9ydHMgYW5kIGV4cGVyaWVuY2UgdGhlIHZpYnJhbnQgbmlnaHRsaWZlIGluIHRoaXMgNS1kYXkgZ2V0YXdheSB0byBHb2EuXCIsXG4gICAgICBpbWFnZTogXCIvaW1hZ2VzL2dvYS5qcGdcIixcbiAgICAgIGN1cnJlbnRQZW9wbGU6IDgsXG4gICAgICBtYXhQZW9wbGU6IDEyLFxuICAgICAgdHJhbnNwb3J0OiBcIkZsaWdodFwiLFxuICAgICAgYnVkZ2V0OiBcIkJ1ZGdldCBUcmF2ZWxcIixcbiAgICAgIGFnZUdyb3VwOiBcIllvdW5nICgyMC0zMHMpXCIsXG4gICAgICBwcmljZTogMTI0OTksXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIktlcmFsYSBCYWNrd2F0ZXJzIFRvdXJcIixcbiAgICAgIGxvY2F0aW9uOiBcIkFsbGVwcGV5LCBLZXJhbGFcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIkV4cGVyaWVuY2UgdGhlIHNlcmVuZSBiYWNrd2F0ZXJzIG9mIEtlcmFsYSBvbiBhIGhvdXNlYm9hdCwgZXhwbG9yZSBzcGljZSBwbGFudGF0aW9ucyBhbmQgZW5qb3kgYXV0aGVudGljIEtlcmFsYSBjdWlzaW5lLlwiLFxuICAgICAgaW1hZ2U6IFwiL2ltYWdlcy9rZXJhbGEuanBnXCIsXG4gICAgICBjdXJyZW50UGVvcGxlOiA2LFxuICAgICAgbWF4UGVvcGxlOiAxMCxcbiAgICAgIHRyYW5zcG9ydDogXCJUcmFpblwiLFxuICAgICAgYnVkZ2V0OiBcIkx1eHVyeSBUcmF2ZWxcIixcbiAgICAgIGFnZUdyb3VwOiBcIk1pZGRsZS1hZ2VkICgzMC01MHMpXCIsXG4gICAgICBwcmljZTogMjI5OTksXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIlJhamFzdGhhbiBIZXJpdGFnZSBUb3VyXCIsXG4gICAgICBsb2NhdGlvbjogXCJKYWlwdXIsIFVkYWlwdXIsIEpvZGhwdXJcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIkV4cGxvcmUgdGhlIHJveWFsIGhlcml0YWdlIG9mIFJhamFzdGhhbiBieSB2aXNpdGluZyBtYWduaWZpY2VudCBmb3J0cywgcGFsYWNlcyBhbmQgZXhwZXJpZW5jaW5nIHRoZSByaWNoIGN1bHR1cmUgYW5kIGN1aXNpbmUuXCIsXG4gICAgICBpbWFnZTogXCIvaW1hZ2VzL3JhamFzdGhhbi5qcGdcIixcbiAgICAgIGN1cnJlbnRQZW9wbGU6IDE1LFxuICAgICAgbWF4UGVvcGxlOiAyMCxcbiAgICAgIHRyYW5zcG9ydDogXCJUcmFpblwiLFxuICAgICAgYnVkZ2V0OiBcIkNsYXNzaWMgVHJhdmVsXCIsXG4gICAgICBhZ2VHcm91cDogXCJGYW1pbHkgRnJpZW5kbHlcIixcbiAgICAgIHByaWNlOiAxODUwMCxcbiAgICB9LFxuICBdXG5cbiAgLy8gU3RhdGUgdG8gc3RvcmUgZmlsdGVyZWQgZGVzdGluYXRpb25zXG4gIGNvbnN0IFtmaWx0ZXJlZERlc3RpbmF0aW9ucywgc2V0RmlsdGVyZWREZXN0aW5hdGlvbnNdID0gdXNlU3RhdGUoc2FtcGxlRGVzdGluYXRpb25zKVxuXG4gIC8vIFBhZ2luYXRpb24gc3RhdGVcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKVxuICBjb25zdCBpdGVtc1BlclBhZ2UgPSAxMlxuXG4gIC8vIEhhbmRsZSBmaWx0ZXIgY2hhbmdlc1xuICBjb25zdCBoYW5kbGVGaWx0ZXJDaGFuZ2UgPSAoZmlsdGVycykgPT4ge1xuICAgIC8vIEZpbHRlciBkZXN0aW5hdGlvbnMgYmFzZWQgb24gc2VsZWN0ZWQgY3JpdGVyaWFcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHNhbXBsZURlc3RpbmF0aW9ucy5maWx0ZXIoKGRlc3RpbmF0aW9uKSA9PiB7XG4gICAgICAvLyBDaGVjayB0cmFuc3BvcnQgZmlsdGVyXG4gICAgICBjb25zdCB0cmFuc3BvcnRNYXRjaCA9IGZpbHRlcnMudHJhbnNwb3J0Lmxlbmd0aCA9PT0gMCB8fCBmaWx0ZXJzLnRyYW5zcG9ydC5pbmNsdWRlcyhkZXN0aW5hdGlvbi50cmFuc3BvcnQpXG5cbiAgICAgIC8vIENoZWNrIGJ1ZGdldCBmaWx0ZXJcbiAgICAgIGNvbnN0IGJ1ZGdldE1hdGNoID0gZmlsdGVycy5idWRnZXQubGVuZ3RoID09PSAwIHx8IGZpbHRlcnMuYnVkZ2V0LmluY2x1ZGVzKGRlc3RpbmF0aW9uLmJ1ZGdldClcblxuICAgICAgLy8gQ2hlY2sgYWdlIGdyb3VwIGZpbHRlclxuICAgICAgY29uc3QgYWdlR3JvdXBNYXRjaCA9IGZpbHRlcnMuYWdlR3JvdXAubGVuZ3RoID09PSAwIHx8IGZpbHRlcnMuYWdlR3JvdXAuaW5jbHVkZXMoZGVzdGluYXRpb24uYWdlR3JvdXApXG5cbiAgICAgIC8vIENoZWNrIHByaWNlIHJhbmdlXG4gICAgICBjb25zdCBwcmljZU1hdGNoID0gZGVzdGluYXRpb24ucHJpY2UgPj0gZmlsdGVycy5taW5QcmljZSAmJiBkZXN0aW5hdGlvbi5wcmljZSA8PSBmaWx0ZXJzLm1heFByaWNlXG5cbiAgICAgIC8vIFJldHVybiB0cnVlIGlmIGFsbCBjb25kaXRpb25zIG1hdGNoXG4gICAgICByZXR1cm4gdHJhbnNwb3J0TWF0Y2ggJiYgYnVkZ2V0TWF0Y2ggJiYgYWdlR3JvdXBNYXRjaCAmJiBwcmljZU1hdGNoXG4gICAgfSlcblxuICAgIHNldEZpbHRlcmVkRGVzdGluYXRpb25zKGZpbHRlcmVkKVxuICAgIHNldEN1cnJlbnRQYWdlKDEpIC8vIFJlc2V0IHRvIHRoZSBmaXJzdCBwYWdlIHdoZW4gZmlsdGVycyBjaGFuZ2VcbiAgfVxuXG4gIC8vIFBhZ2luYXRpb24gbG9naWNcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChmaWx0ZXJlZERlc3RpbmF0aW9ucy5sZW5ndGggLyBpdGVtc1BlclBhZ2UpXG4gIGNvbnN0IHBhZ2luYXRlZERlc3RpbmF0aW9ucyA9IGZpbHRlcmVkRGVzdGluYXRpb25zLnNsaWNlKChjdXJyZW50UGFnZSAtIDEpICogaXRlbXNQZXJQYWdlLCBjdXJyZW50UGFnZSAqIGl0ZW1zUGVyUGFnZSlcblxuICBjb25zdCBoYW5kbGVQYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICBzZXRDdXJyZW50UGFnZShwYWdlKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8QXVyb3JhQmFja2dyb3VuZCBjbGFzc05hbWU9XCJiZy1ibGFjayB0ZXh0LXdoaXRlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktMjAgbWluLWgtc2NyZWVuXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgbWItNlwiPkNvbW11bml0eTwvaDE+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGdhcC04XCI+XG4gICAgICAgICAgey8qIFNpZGViYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzRcIj5cbiAgICAgICAgICAgIDxGaWx0ZXJTaWRlYmFyIG9uRmlsdGVyQ2hhbmdlPXtoYW5kbGVGaWx0ZXJDaGFuZ2V9IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTWFpbiBDb250ZW50ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1ncm93IG1kOnctMy80XCI+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLTZcIj5BdmFpbGFibGUgVHJpcHM8L2gyPlxuXG4gICAgICAgICAgICB7cGFnaW5hdGVkRGVzdGluYXRpb25zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICAgICAgICAgIHtwYWdpbmF0ZWREZXN0aW5hdGlvbnMubWFwKChkZXN0aW5hdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxEZXN0aW5hdGlvbkNhcmQga2V5PXtpbmRleH0gZGVzdGluYXRpb249e2Rlc3RpbmF0aW9ufSAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMTBcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtZ3JheS0zMDBcIj5ObyBkZXN0aW5hdGlvbnMgbWF0Y2ggeW91ciBmaWx0ZXJzLjwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0yIHRleHQtZ3JheS00MDBcIj5UcnkgYWRqdXN0aW5nIHlvdXIgZmlsdGVycyB0byBzZWUgbW9yZSBvcHRpb25zLjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogUGFnaW5hdGlvbiBDb250cm9scyAqL31cbiAgICAgICAgICAgIHt0b3RhbFBhZ2VzID4gMSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgbXQtNiBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogdG90YWxQYWdlcyB9LCAoXywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUGFnZUNoYW5nZShpbmRleCArIDEpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZCAke1xuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlID09PSBpbmRleCArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1ncmF5LTcwMCB0ZXh0LWdyYXktMzAwIGhvdmVyOmJnLWdyYXktNjAwXCJcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIG10LTEwIG1iLTEwXCI+XG4gICAgICAgICAgICAgIEpvaW4gb3VyIGdyb3dpbmcgY29tbXVuaXR5IG9mIHRyYXZlbCBlbnRodXNpYXN0cyBhbmQgbWFrZSB5b3VyIG5leHQgdHJpcCB1bmZvcmdldHRhYmxlIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvQXVyb3JhQmFja2dyb3VuZD5cbiAgKVxufVxuXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJEZXN0aW5hdGlvbkNhcmQiLCJGaWx0ZXJTaWRlYmFyIiwiQXVyb3JhQmFja2dyb3VuZCIsIkNvbW11bml0eSIsInNhbXBsZURlc3RpbmF0aW9ucyIsIm5hbWUiLCJsb2NhdGlvbiIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJjdXJyZW50UGVvcGxlIiwibWF4UGVvcGxlIiwidHJhbnNwb3J0IiwiYnVkZ2V0IiwiYWdlR3JvdXAiLCJwcmljZSIsImZpbHRlcmVkRGVzdGluYXRpb25zIiwic2V0RmlsdGVyZWREZXN0aW5hdGlvbnMiLCJjdXJyZW50UGFnZSIsInNldEN1cnJlbnRQYWdlIiwiaXRlbXNQZXJQYWdlIiwiaGFuZGxlRmlsdGVyQ2hhbmdlIiwiZmlsdGVycyIsImZpbHRlcmVkIiwiZmlsdGVyIiwiZGVzdGluYXRpb24iLCJ0cmFuc3BvcnRNYXRjaCIsImxlbmd0aCIsImluY2x1ZGVzIiwiYnVkZ2V0TWF0Y2giLCJhZ2VHcm91cE1hdGNoIiwicHJpY2VNYXRjaCIsIm1pblByaWNlIiwibWF4UHJpY2UiLCJ0b3RhbFBhZ2VzIiwiTWF0aCIsImNlaWwiLCJwYWdpbmF0ZWREZXN0aW5hdGlvbnMiLCJzbGljZSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJwYWdlIiwiY2xhc3NOYW1lIiwiZGl2IiwiaDEiLCJvbkZpbHRlckNoYW5nZSIsImgyIiwibWFwIiwiaW5kZXgiLCJwIiwiQXJyYXkiLCJmcm9tIiwiXyIsImJ1dHRvbiIsIm9uQ2xpY2siXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/community/page.jsx\n"));

/***/ })

});