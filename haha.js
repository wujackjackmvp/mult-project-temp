tplPath project
{
  mode: 'development',
  context: 'D:\\company\\juhe-project\\mult-project',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'D:\\company\\juhe-project\\mult-project\\dist\\project',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    symlinks: true,
    alias: {
      '@': 'D:\\company\\juhe-project\\mult-project\\src\\project',
      vue$: 'vue/dist/vue.runtime.esm.js',
      common: 'D:\\company\\juhe-project\\mult-project\\src\\common'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'D:\\company\\juhe-project\\mult-project\\node_modules',
      'D:\\company\\juhe-project\\mult-project\\node_modules\\_@vue_cli-service@4.5.6@@vue\\cli-service\\node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp') */
      {}
    ]
  },
  resolveLoader: {
    modules: [
      'D:\\company\\juhe-project\\mult-project\\node_modules\\_@vue_cli-plugin-babel@4.5.6@@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'D:\\company\\juhe-project\\mult-project\\node_modules',
      'D:\\company\\juhe-project\\mult-project\\node_modules\\_@vue_cli-service@4.5.6@@vue\\cli-service\\node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp-loaders') */
      {}
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\company\\juhe-project\\mult-project\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '006972ac'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-loader@15.9.3@vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'D:\\company\\juhe-project\\mult-project\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '006972ac'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_css-loader@3.6.0@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('cache-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\company\\juhe-project\\mult-project\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '1c227312'
            }
          },
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'D:\\company\\juhe-project\\mult-project\\node_modules\\_babel-loader@8.1.0@babel-loader\\lib\\index.js'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: false,
          cache: true,
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_DGW_URL: '"http://dgwrec.yltg.com.cn"',
          VUE_APP_NAME: '"project"',
          VUE_APP_REDIRECT_URL: '"http://sso.833006.biz"',
          VUE_APP_REPORT_URL: '"http://report.833006.biz/tgjf-report-web-report"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html-app') */
    new HtmlWebpackPlugin(
      {
        title: '项目一',
        templateParameters: function () { /* omitted long function */ },
        chunks: [
          'chunk-vendors',
          'chunk-common',
          'app'
        ],
        template: 'public/project/index.html',
        filename: 'index.html'
      }
    ),
    /* config.plugin('preload-app') */
    new PreloadPlugin(
      {
        rel: 'preload',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'initial',
          entries: [
            'app'
          ]
        },
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch-app') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'asyncChunks',
          entries: [
            'app'
          ]
        }
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'D:\\company\\juhe-project\\mult-project\\public\\project',
          to: 'D:\\company\\juhe-project\\mult-project\\dist\\project',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'project\\index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: 'new_report_front'
      }
    ),
    {
      options: {},
      multiStep: undefined,
      fullBuildTimeout: 200,
      requestTimeout: 10000
    },
    {
      options: {
        context: 'D:\\company\\juhe-project\\mult-project',
        manifest: {
          name: 'vender_library',
          content: {
            './node_modules/async-validator/es/util.js': {
              id: 0,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'warning',
                  'format',
                  'isEmptyValue',
                  'isEmptyObject',
                  'asyncMap',
                  'complementError',
                  'deepMerge'
                ]
              }
            },
            './node_modules/async-validator/es/rule/index.js': {
              id: 1,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/axios/lib/utils.js': {
              id: 2,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/vue/dist/vue.runtime.esm.js': {
              id: 3,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/babel-runtime/helpers/typeof.js': {
              id: 4,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/util.js': {
              id: 5,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/dom.js': {
              id: 6,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_global.js': {
              id: 7,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/mixins/emitter.js': {
              id: 8,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_descriptors.js': {
              id: 9,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_has.js': {
              id: 10,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/helpers/extends.js': {
              id: 11,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/webpack/buildin/global.js': {
              id: 12,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_hide.js': {
              id: 13,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-dp.js': {
              id: 14,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-iobject.js': {
              id: 15,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_wks.js': {
              id: 16,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/async-validator/es/messages.js': {
              id: 17,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'newMessages',
                  'messages'
                ]
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_core.js': {
              id: 18,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_is-object.js': {
              id: 19,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_fails.js': {
              id: 20,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/async-validator/es/validator/index.js': {
              id: 21,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/element-ui/lib/locale/index.js': {
              id: 22,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/vue-popper.js': {
              id: 23,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/merge.js': {
              id: 24,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/shared.js': {
              id: 25,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/throttle-debounce/debounce.js': {
              id: 26,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_an-object.js': {
              id: 27,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_property-desc.js': {
              id: 28,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-keys.js': {
              id: 29,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_library.js': {
              id: 30,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_uid.js': {
              id: 31,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-pie.js': {
              id: 32,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/async-validator/es/rule/required.js': {
              id: 33,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/type.js': {
              id: 34,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/axios/lib/defaults.js': {
              id: 35,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/mixins/locale.js': {
              id: 36,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/scrollbar-width.js': {
              id: 37,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/input.js': {
              id: 38,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/resize-event.js': {
              id: 39,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/throttle-debounce/throttle.js': {
              id: 40,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/scrollbar.js': {
              id: 41,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/mixins/focus.js': {
              id: 42,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/scroll-into-view.js': {
              id: 43,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/aria-utils.js': {
              id: 44,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_export.js': {
              id: 45,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-primitive.js': {
              id: 46,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_defined.js': {
              id: 47,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-integer.js': {
              id: 48,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_shared-key.js': {
              id: 49,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_shared.js': {
              id: 50,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_enum-bug-keys.js': {
              id: 51,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-gops.js': {
              id: 52,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-object.js': {
              id: 53,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_iterators.js': {
              id: 54,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_set-to-string-tag.js': {
              id: 55,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_wks-ext.js': {
              id: 56,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_wks-define.js': {
              id: 57,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/timers-browserify/main.js': {
              id: 58,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/process/browser.js': {
              id: 59,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/bind.js': {
              id: 60,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/adapters/xhr.js': {
              id: 61,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/createError.js': {
              id: 62,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/isCancel.js': {
              id: 63,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/Cancel.js': {
              id: 64,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/date.js': {
              id: 65,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/types.js': {
              id: 66,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/popup/index.js': {
              id: 67,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/mixins/migrating.js': {
              id: 68,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/clickoutside.js': {
              id: 69,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/checkbox.js': {
              id: 70,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-helper-vue-jsx-merge-props/index.js': {
              id: 71,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/tag.js': {
              id: 72,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_ie8-dom-define.js': {
              id: 73,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_dom-create.js': {
              id: 74,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-keys-internal.js': {
              id: 75,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_iobject.js': {
              id: 76,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_cof.js': {
              id: 77,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_iter-define.js': {
              id: 78,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_redefine.js': {
              id: 79,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-create.js': {
              id: 80,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-gopn.js': {
              id: 81,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/radio.js': {
              id: 82,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/async-validator/es/validator/string.js': {
              id: 83,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/rule/whitespace.js': {
              id: 84,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/rule/type.js': {
              id: 85,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/rule/range.js': {
              id: 86,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/rule/enum.js': {
              id: 87,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/rule/pattern.js': {
              id: 88,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/method.js': {
              id: 89,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/number.js': {
              id: 90,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/boolean.js': {
              id: 91,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/regexp.js': {
              id: 92,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/integer.js': {
              id: 93,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/float.js': {
              id: 94,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/array.js': {
              id: 95,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/object.js': {
              id: 96,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/enum.js': {
              id: 97,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/pattern.js': {
              id: 98,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/date.js': {
              id: 99,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/async-validator/es/validator/required.js': {
              id: 100,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/vue/dist/vue.esm.js': {
              id: 102,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/setimmediate/setImmediate.js': {
              id: 103,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/vue-router/dist/vue-router.esm.js': {
              id: 104,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/axios/index.js': {
              id: 105,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/axios.js': {
              id: 106,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/is-buffer/index.js': {
              id: 107,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/Axios.js': {
              id: 108,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/normalizeHeaderName.js': {
              id: 109,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/settle.js': {
              id: 110,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/enhanceError.js': {
              id: 111,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/buildURL.js': {
              id: 112,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/parseHeaders.js': {
              id: 113,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/isURLSameOrigin.js': {
              id: 114,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/btoa.js': {
              id: 115,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/cookies.js': {
              id: 116,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/InterceptorManager.js': {
              id: 117,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/dispatchRequest.js': {
              id: 118,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/transformData.js': {
              id: 119,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/isAbsoluteURL.js': {
              id: 120,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/combineURLs.js': {
              id: 121,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/CancelToken.js': {
              id: 122,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/spread.js': {
              id: 123,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/vuex/dist/vuex.esm.js': {
              id: 124,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default',
                  'Store',
                  'createLogger',
                  'createNamespacedHelpers',
                  'install',
                  'mapActions',
                  'mapGetters',
                  'mapMutations',
                  'mapState'
                ]
              }
            },
            './node_modules/element-ui/lib/element-ui.common.js': {
              id: 125,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/date-util.js': {
              id: 126,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/locale/lang/zh-CN.js': {
              id: 127,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/deepmerge/dist/cjs.js': {
              id: 128,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/locale/format.js': {
              id: 129,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/popup/popup-manager.js': {
              id: 130,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/popper.js': {
              id: 131,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/button.js': {
              id: 132,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js': {
              id: 133,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/element-ui/lib/transitions/collapse-transition.js': {
              id: 134,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/vdom.js': {
              id: 135,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/tooltip.js': {
              id: 136,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/button-group.js': {
              id: 137,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/checkbox-group.js': {
              id: 138,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/after-leave.js': {
              id: 139,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/progress.js': {
              id: 140,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/throttle-debounce/index.js': {
              id: 141,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/select.js': {
              id: 142,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/option.js': {
              id: 143,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/normalize-wheel/index.js': {
              id: 144,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/normalize-wheel/src/normalizeWheel.js': {
              id: 145,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js': {
              id: 146,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/normalize-wheel/src/isEventSupported.js': {
              id: 147,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/normalize-wheel/src/ExecutionEnvironment.js': {
              id: 148,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/utils/aria-dialog.js': {
              id: 149,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/async-validator/es/index.js': {
              id: 150,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/babel-runtime/core-js/object/assign.js': {
              id: 151,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/fn/object/assign.js': {
              id: 152,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.object.assign.js': {
              id: 153,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_ctx.js': {
              id: 154,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_a-function.js': {
              id: 155,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-assign.js': {
              id: 156,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_array-includes.js': {
              id: 157,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-length.js': {
              id: 158,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_to-absolute-index.js': {
              id: 159,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/core-js/symbol/iterator.js': {
              id: 160,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/fn/symbol/iterator.js': {
              id: 161,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.string.iterator.js': {
              id: 162,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_string-at.js': {
              id: 163,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_iter-create.js': {
              id: 164,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-dps.js': {
              id: 165,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_html.js': {
              id: 166,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-gpo.js': {
              id: 167,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/web.dom.iterable.js': {
              id: 168,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.array.iterator.js': {
              id: 169,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_add-to-unscopables.js': {
              id: 170,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_iter-step.js': {
              id: 171,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/core-js/symbol.js': {
              id: 172,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/fn/symbol/index.js': {
              id: 173,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.symbol.js': {
              id: 174,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_meta.js': {
              id: 175,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_enum-keys.js': {
              id: 176,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_is-array.js': {
              id: 177,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-gopn-ext.js': {
              id: 178,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/_object-gopd.js': {
              id: 179,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es6.object.to-string.js': {
              id: 180,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es7.symbol.async-iterator.js': {
              id: 181,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/babel-runtime/node_modules/core-js/library/modules/es7.symbol.observable.js': {
              id: 182,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/input-number.js': {
              id: 183,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/cascader-panel.js': {
              id: 184,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/element-ui/lib/popover.js': {
              id: 185,
              buildMeta: {
                providedExports: true
              }
            }
          }
        }
      }
    },
    {
      assets: [
        {
          filepath: 'D:\\company\\juhe-project\\mult-project\\public\\project\\*.js',
          publicPath: './',
          outputPath: './'
        }
      ],
      addedAssets: []
    }
  ],
  entry: {
    app: [
      'D:\\company\\juhe-project\\mult-project\\src\\project\\main.js'
    ]
  }
}
