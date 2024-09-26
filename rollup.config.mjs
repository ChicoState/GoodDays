import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "./src/index.tsx",
    output: {
        file: "./dist/index.js",
        format: "umd",
        sourcemap: true
    },
    plugins: [
        replace({
            values: {
                "process.env.NODE_ENV": JSON.stringify("development"),
            },
            preventAssignment: true,
        }),
        commonjs(),
        nodeResolve(),
        typescript(),
    ]
}
