module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            less: {
                files: [
                    'less/*'
                ],
                tasks: ['concurrent']
            },
            js: {
                files: [
                    'javascript/*'
                ],
                tasks: ['concurrent']
            },
            css: {
                files: [
                    'css/*'
                ],
                tasks: ['concurrent']
            },
            html: {
                files: [
                    'html/*',
                    'html/partials/*'
                ],
                tasks: ['concurrent']
            },
            other: {
                files: [
                    'other/*'
                ],
                tasks: ['concurrent']
            }
        },
        concurrent: {
            target1: ['less', 'uglify', 'htmlmin'],
            target2: ['cssmin'],
            target3: ['copy', 'clean']
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: false,
                compress: true
            },
            min: {
                files: [
                    {
                        expand: true,
                        cwd: 'javascript/',
                        src: '*.js',
                        dest: '<%= theme_name %>/assets/js/'
                    }
                ]
            },
            combine: {
                files: {
                    '<%= theme_name %>/assets/js/pack.min.js':
                    [
                        '<%= theme_name %>/assets/js/blob.min.js',
                        '<%= theme_name %>/assets/js/ajax.loading.js',
                        '<%= theme_name %>/assets/js/master.js'
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
                    removeAttributeQuotes: false,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    removeEmptyAttributes: true,
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
                    // includes files within path
                    {
                        src: ['fonts/*'],
                        dest: '<%= theme_name %>/assets/'
                    },
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
            css: ["/css/compiled.css"],
        },
        'theme_name': "../Slight"
    });

    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
};