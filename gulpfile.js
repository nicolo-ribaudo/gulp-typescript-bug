"use strict";

const path = require("path");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");

function createCompilerTask(title, dir, prereq = []) {
    return gulp.task(title, prereq, () => {
        const tsProject = ts.createProject(path.join(dir, "tsconfig.json"));
        const output = path.join(dir, tsProject.config.compilerOptions.outDir);

        console.log(output);

        return tsProject.src()
            .pipe(ts(tsProject)).js
            .pipe(gulp.dest(output));
    });
}

createCompilerTask("compile:a", "./a");

createCompilerTask("compile:b", "./b");

gulp.task("default", [ "compile:a", "compile:b" ]);