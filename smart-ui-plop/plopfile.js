import pageGenerator from './generators/page.js';
import componentGenerator from './generators/component.js';
import storeGenerator from './generators/store.js';

/**
 * Plop 主入口文件
 * 注册所有生成器
 */
export default function (plop) {
  // 注册页面生成器
  plop.setGenerator('page', pageGenerator);
  
  // 注册组件生成器
  plop.setGenerator('component', componentGenerator);
  
  // 注册store生成器（可扩展）
  plop.setGenerator('store', storeGenerator);
  
  // 设置默认模板引擎
  plop.setDefaultInclude({ equals: true });
}
