module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: [
                    'other/*',
                    'html/partials/*',
                    'html/*'
                ],
                tasks: ['htmlmin', 'copy', 'clean']
            },
            less: {
                files: [
                    'less/*'
                ],
                tasks: ['less', 'autoprefixer', 'cssmin']
            },
            js: {
                files: [
                    "javascript/*"
                ],
                tasks: ['uglify']
            }
        },
        concurrent: {
            target1: ['less', 'uglify'],
            target2: ['autoprefixer', 'htmlmin'],
            target3: ['cssmin'],
            target4: ['copy', 'clean']
        },
        autoprefixer: {
            files: {
                src: 'css/*.css'
            }
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                compress: true,
                preserveComments: false,

            },
            combine_min: {
                files: {
                    '<%= theme_name %>/assets/js/pack.min.js':
                    [
                        'javascript/blob.*.js'
                    ]
                }
            }
        },
        less: {
            components: {
                files: {
                    'css/compiled.css': ['less/less_imports.less']
                }
            },
            options: {
                expand: true,
                paths: [
                    'less'
                ]
            }
        },
        cssmin: {
            combine: {
                options: {
                    noAggressiveMerging: true
                },
                files: {
                    '<%= theme_name %>/assets/css/style.css': ['css/*.css']
                }
            }
        },
        htmlmin: {
            minify: {
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
                files: {
                    '<%= theme_name %>/default.hbs': 'html/default.hbs',
                    '<%= theme_name %>/error.hbs': 'html/error.hbs',
                    '<%= theme_name %>/index.hbs': 'html/index.hbs',
                    '<%= theme_name %>/post.hbs': 'html/post.hbs',
                    '<%= theme_name %>/partials/menu.hbs': 'html/partials/menu.hbs',
                    '<%= theme_name %>/partials/pagination.hbs': 'html/partials/pagination.hbs',
                    '<%= theme_name %>/partials/sidebar.hbs': 'html/partials/sidebar.hbs',
                }
            }
        },
        copy: {
            main: {
                files: [
//                    {
//                        src: ['fonts/*'],
//                        dest: '<%= theme_name %>/assets/'
//                    },
                    {
                        src: ['images/*'],
                        dest: '<%= theme_name %>/assets/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'raw/',
                        src: '*',
                        dest: '<%= theme_name %>/'
                    }
                ]
            }
        },
        clean: {
            css: ["css/compiled.css"],
        },
        //'theme_name': "../ghost/content/themes/Slight"
        'theme_name': "../Slight"
    });

    grunt.registerTask('default', ['concurrent']);

    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-autoprefixer');
};