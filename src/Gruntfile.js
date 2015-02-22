module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: [
                    "other/*",
                    "html/partials/*",
                    "html/*"
                ],
                tasks: ["task.html"]
            },
            less: {
                files: [
                    "less/*"
                ],
                tasks: ["task.less"]
            },
            js: {
                files: [
                    "javascript/*"
                ],
                tasks: ["task.js"]
            },
            strings: {
                files: [
                    "strings.json"
                ],
                tasks: ["task.less", "task.js", "task.html"]
            }
        },
        concurrent: {
            target0: ["clean"],
            target1: ["task.less", "task.js", "task.html"],
            target2: ["clean"]
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap: false,
                preserveComments: false,
                compress: {
                    unsafe: true
                },
            },
            main: {
                files: {
                    '<%= theme_name %>/assets/js/pack.min.js': ["tmp/javascript/blob.*.js"]
                }
            }
        },
        less: {
            main: {
                options: {
                    ieCompat: false
                },
                files: {
                    "tmp/css/compiled.css": "less/less_imports.less"
                }
            }
        },
        concat: {
            options: {
            },
            main: {
                src: ["less/css/*.css", "tmp/css/compiled.css"],
                dest: "tmp/css/bundle.css",
            },
        },
        autoprefixer: {
            main: {
                src: "tmp/css/bundle.css"
            }
        },
        cssmin: {
            main: {
                options: {
                    keepSpecialComments: false
                },
                files: {
                    '<%= theme_name %>/assets/css/style.css': ["tmp/css/bundle.css"]
                }
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: false, // issues with tags out of order
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    keepClosingSlash: false,
                    minifyJS: true,
                    ignoreCustomComments: [/({{!< default}})/i]
                },
                files: [
                  { src: "**/*.hbs", dest: "<%= theme_name %>/", expand: true, cwd: "./tmp/html" }
                ]
            }
        },
        includereplace: {
            html: {
                options: {
                    globals: grunt.file.readJSON("strings.json"),
                },
                files: [
                  { src: "html/**/*.hbs", dest: "tmp/", expand: true, cwd: "./" }
                ]
            },
            less: {
                options: {
                    globals: grunt.file.readJSON("strings.json"),
                },
                files: {
                    'tmp/css/bundle.css': ["tmp/css/bundle.css"]
                }
            },
            js: {
                options: {
                    globals: grunt.file.readJSON("strings.json"),
                },
                files: [
                  { src: "javascript/*.js", dest: "tmp/", expand: true }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ["images/*"],
                        dest: "<%= theme_name %>/assets/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: "raw/",
                        src: "*",
                        dest: "<%= theme_name %>/"
                    }
                ]
            }
        },
        clean: {
            options: {
                force: true
            },
            css: ["tmp"],
        },
        //'theme_name': "../ghost/content/themes/Slight"
        'theme_name': "../Slight"
    });

    grunt.registerTask("default", ["concurrent"]);
    grunt.registerTask("task.less", ["less", "concat", "includereplace:less", "autoprefixer", "cssmin"]);
    grunt.registerTask("task.js", ["includereplace:js", "uglify"]);
    grunt.registerTask("task.html", ["includereplace:html", "htmlmin", "copy"]);

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-include-replace");
};