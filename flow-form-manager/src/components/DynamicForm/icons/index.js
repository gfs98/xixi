/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0 
 *Title: form-generator/Element UI表单设计及代码生成器 
 *GitHub: https://github.com/JakHuang/form-generator
 */

import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'// svg component

// register globally
Vue.component( 'svg-icon', SvgIcon )
console.log(123)
const req = require.context( './svg', false, /\.svg$/ )
const requireAll = requireContext => requireContext.keys().map( requireContext )
requireAll( req )
