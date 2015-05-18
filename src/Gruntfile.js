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
            target1: ["task.less", "task.js", "task.html"]
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap: false,
                preserveComments: false,
                compress: {
                    unsafe: true
                }
            },
            main: {
                files: {
                    '<%= base %>/assets/js/pack.min.js': ["tmp/javascript/blob.*.js"]
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
                dest: "tmp/css/bundle.css"
            }
        },
        autoprefixer: {
            main: {
                src: "tmp/css/bundle.css"
            }
        },
        cssmin: {
            main: {
                options: {
                    keepSpecialComments: false,
                    report: "min"
                },
                files: {
                    '<%= base %>/assets/css/style.css': ["tmp/css/bundle.css"]
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
                  { src: "**/*.hbs", dest: "<%= base %>/", expand: true, cwd: "./tmp/html" }
                ]
            }
        },
        includereplace: {
            html: {
                options: {
                    globals: grunt.file.readJSON("strings.json")
                },
                files: [
                  { src: "html/**/*.hbs", dest: "tmp/", expand: true, cwd: "./" }
                ]
            },
            less: {
                options: {
                    globals: grunt.file.readJSON("strings.json")
                },
                files: {
                    'tmp/css/bundle.css': ["tmp/css/bundle.css"]
                }
            },
            js: {
                options: {
                    globals: grunt.file.readJSON("strings.json")
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
                        dest: "<%= base %>/assets/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: "raw/",
                        src: "*",
                        dest: "<%= base %>/"
                    }
                ]
            }
        },
        clean: {
            options: {
                force: true
            },
            tmp: ["tmp", "<%= base %>/"]
        },
        checkPages: {
            dev: {
                options: {
                    pageUrls: [
                        "https://silvenga.com"
                    ],
                    linksToIgnore: [
                        "https://www.linkedin.com/in/silvenga",
                        "https://www.facebook.com/silvenga"
                    ],
                    userAgent: "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36",
                    checkLinks: true,
                    noRedirects: false,
                    checkCaching: true,
                    checkCompression: true,
                    maxResponseTime: 1000,
                    summary: true
                }
            }
        },
        uncss: {
            main: {
                options: {
                    ignoreSheets: [/github.com/]
                },
                files: {
                    'tmp/css/bundle.css': []
                }
            }
        },
        criticalcss: {
            custom: {
                options: {
                    url: "https://silvenga.com",
                    width: 320,
                    height: 640,
                    outputfile: "critical.css",
                    filename: "<%= base %>/assets/css/style.css",
                    buffer: 800 * 1024,
                    ignoreConsole: false
                }
            }
        }
    });

    grunt.config("base", (grunt.option("target") == "dev") ? "../ghost/content/themes/Slight" : "../Slight");

    grunt.registerTask("default", ["concurrent"]);
    grunt.registerTask("task.less", ["less", "concat", "includereplace:less", "autoprefixer", "cssmin"]);
    grunt.registerTask("task.js", ["includereplace:js", "uglify"]);
    grunt.registerTask("task.html", ["includereplace:html", "htmlmin", "copy"]);

    grunt.registerTask("test", ["lazyLoadLinks", "checkPages"]);
    grunt.registerTask("postcss", ["clean", "lazyLoadLinks", "uncss", "cssmin"]);

    grunt.registerTask("lazyLoadLinks", "", function () {
        grunt.config("checkPages.dev.options.pageUrls", grunt.file.readJSON("links.json"));
        grunt.config(["uncss", "main", "files", "tmp/css/bundle.css"], grunt.file.readJSON("links.json"));
    });

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
    grunt.loadNpmTasks("grunt-check-pages");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-criticalcss");
};