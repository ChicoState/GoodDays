const path = require("node:path");

const known_esModules = [
    "d3(-\\w+)?",
    //"d3-array",
    //"d3-color",
    //"d3-format",
    //"d3-interpolate",
    //"d3-scale",
    "internmap"
];

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+.tsx?$": ["ts-jest"],
        "^.+.jsx?$": ["babel-jest"],
    },
    transformIgnorePatterns: [
        `/node_modules/(?!${known_esModules.join("|")})`,
    ],
    moduleNameMapper: {
        "\\.(css)$": path.join(__dirname, "/empty.js"),
    }
};

