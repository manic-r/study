const path = require('path');
const fs = require('fs');
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

module.exports = function (showCaseComponentPath, result) {
  if (result.pageDemo) {
    const pageDemoComponent = generatePageDemoComponent(result);
    fs.writeFileSync(path.join(showCaseComponentPath, `zh.page.component.ts`), pageDemoComponent.zh);
  }
  const demoTemplate = generateTemplate(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.html`), demoTemplate.zh);
  const demoComponent = generateDemoComponent(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `zh.component.ts`), demoComponent.zh);
  const demoModule = generateDemoModule(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `index.module.ts`), demoModule);
};

function generateDemoModule(content) {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-module.template.ts')));
  const component = content.name;
  const demoMap = content.demoMap;
  let imports = '';
  let declarations = '';
  let entryComponents = [];
  for (const key in demoMap) {
    const declareComponents = [`NzDemo${componentName(component)}${componentName(key)}Component`];
    const entries = retrieveEntryComponents(demoMap[key] && demoMap[key].ts);
    entryComponents.push(...entries);
    declareComponents.push(...entries);
    imports += `import { ${declareComponents.join(', ')} } from './${key}';\n`;
    declarations += `\t\t${declareComponents.join(',\n\t')},\n`;
  }
  imports += `import { NzDemo${componentName(component)}ZhComponent } from './zh.component';\n`;
  declarations += `\t\tNzDemo${componentName(component)}ZhComponent,\n`;
  if (content.pageDemo) {
    imports += `import { NzPageDemo${componentName(component)}ZhComponent } from './zh.page.component';\n`;
    declarations += `\t\tNzPageDemo${componentName(component)}ZhComponent,\n`;
  }
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{component}}/g, componentName(component))
    .replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function componentName(component) {
  return camelCase(capitalizeFirstLetter(component));
}

function generateComponentName(component, language) {
  return `NzDemo${componentName(component)}${capitalizeFirstLetter(language)}Component`;
}

function generatePageDemoComponent(content) {
  const component = content.name;
  let zhOutput = content.pageDemo.zhCode;
  zhOutput = zhOutput
    .replace(`NzPageDemo${componentName(component)}Component`, `NzPageDemo${componentName(component)}ZhComponent`)
    .replace(`nz-page-demo-${component}`, `nz-page-demo-${component}-zh`);
  return {
    zh: zhOutput
  };
}

function generateDemoComponent(content) {
  const demoComponentTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-component.template.ts')));
  const component = content.name;

  let output = demoComponentTemplate;
  output = output.replace(/{{component}}/g, component);

  let zhOutput = output;

  zhOutput = zhOutput.replace(/{{componentName}}/g, generateComponentName(component, 'zh'));
  zhOutput = zhOutput.replace(/{{language}}/g, 'zh');

  return {
    zh: zhOutput
  };
}

function generateTemplate(result) {
  const generateTitle = require('./generate.title');
  const innerMap = generateExample(result);
  const titleMap = {
    zh: generateTitle(result.docZh.meta, result.docZh.path)
  };
  const name = result.name;
  const hasPageDemo = !!result.pageDemo;
  return {
    zh: wrapperAll(
      generateToc('zh-CN', result.name, result.demoMap),
      wrapperHeader(titleMap.zh, result.docZh.whenToUse, 'zh', innerMap.zh, hasPageDemo, name) + wrapperAPI(result.docZh.api)
    )
  };
}

function wrapperAPI(content) {
  return `<section class="markdown api-container" ngNonBindable>${content}</section>`;
}

function wrapperHeader(title, whenToUse, language, example, hasPageDemo, name) {
  if (example) {
    return `<section class="markdown">
	${title}
	<section class="markdown" ngNonBindable>
		${whenToUse}
	</section>
	${hasPageDemo ? `<section class="page-demo"><nz-page-demo-${name}-${language}></nz-page-demo-${name}-${language}></section>` : ''}
	<h2>
		<span>${language === 'zh' ? '代码演示' : 'Examples'}</span>
		<i nz-icon nzType="appstore" class="code-box-expand-trigger" nz-tooltip nzTooltipTitle="${language === 'zh' ? '展开全部代码' : 'Expand All Code'
      }" (click)="expandAllCode()"></i>
	</h2>
</section>${example}`;
  } else {
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
	</section></section>`;
  }
}

function wrapperAll(toc, content) {
  return `<article>${toc}${content}</article>`;
}

function generateToc(language, name, demoMap) {
  let linkArray = [];
  for (const key in demoMap) {
    linkArray.push({
      content: `<nz-link nzHref="#components-${name}-demo-${key}" nzTitle="${demoMap[key].meta.title[language]}"></nz-link>`,
      order: demoMap[key].meta.order
    });
  }
  linkArray.sort((pre, next) => pre.order - next.order);
  linkArray.push({ content: `<nz-link nzHref="#api" nzTitle="API"></nz-link>` });
  const links = linkArray.map(link => link.content).join('');
  return `
<nz-affix class="toc-affix" [nzOffsetTop]="16">
    <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
        ${links}
    </nz-anchor>
</nz-affix>`;
}

function generateExample(result) {
  const demoMap = result.demoMap;
  const isZhUnion = result.docZh.meta.cols;
  const templateSplit = String(fs.readFileSync(path.resolve(__dirname, '../template/example-split.template.html')));
  const templateUnion = String(fs.readFileSync(path.resolve(__dirname, '../template/example-union.template.html')));
  let demoList = [];
  for (const key in demoMap) {
    demoList.push(Object.assign({ name: key }, demoMap[key]));
  }
  demoList.sort((pre, next) => pre.meta.order - next.meta.order);
  let firstZhPart = '';
  let secondZhPart = '';
  let zhPart = '';
  demoList.forEach((item, index) => {
    zhPart += item.zhCode;
    if (index % 2 === 0) {
      firstZhPart += item.zhCode;
    } else {
      secondZhPart += item.zhCode;
    }
  });
  return {
    zh: isZhUnion
      ? templateUnion.replace(/{{content}}/g, zhPart)
      : templateSplit.replace(/{{first}}/g, firstZhPart).replace(/{{second}}/g, secondZhPart),
  };
}

function retrieveEntryComponents(plainCode) {
  const matches = (plainCode + '').match(/^\/\*\s*?declarations:\s*([^\n]+?)\*\//) || [];
  if (matches[1]) {
    return matches[1]
      .split(',')
      .map(className => className.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);
  }
  return [];
}
