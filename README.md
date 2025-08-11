## @intain_tech/component

Reusable React component library for building modern, accessible UI screens faster. It includes buttons, inputs, selects, modals, tabs, tooltips, sidebars, and high-performance virtualized tables with light/dark theme support via CSS variables.

### Key features

- **Rich component set**: `Button`, `Input`, `Select`, `Modal`, `CustomTab`, `ToolTip`, `Sidebar`, `VirtualizedTable`, and more
- **Themeable**: Light/dark theming powered by CSS variables; easy to extend
- **Accessible defaults**: Sensible aria attributes and keyboard-friendly interactions where applicable
- **Composable**: Headless-friendly patterns for integrating with your design system
- **Tree-shakeable named exports**


### Installation

Install the package from npm along with required peer dependencies.

```bash
npm install @intain_tech/component \
  react react-dom \
  @emotion/react @emotion/styled @mui/material @mui/icons-material \
  antd bootstrap react-router-dom react-window
```

```bash
yarn add @intain_tech/component \
  react react-dom \
  @emotion/react @emotion/styled @mui/material @mui/icons-material \
  antd bootstrap react-router-dom react-window
```

Notes

- This library injects its own styles at runtime; no extra CSS import is required.
- Ensure your app uses React 19+ and compatible versions of listed peer dependencies.


### Quick start

Import components as named exports and use them in your app.

```jsx
import React, { useState, useEffect } from 'react';
import { 
  Button,
  Input,
  Select,
  Modal,
  ThemeSwitch
} from '@intain_tech/component';

function Example() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  // Optional: apply dark theme to the document root
  useEffect(() => {
    document.documentElement.setAttribute('dark-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div style={{ padding: 16 }}>
      <ThemeSwitch isOn={isDark} toggleTheme={() => setIsDark(v => !v)} />

      <div style={{ marginTop: 12 }}>
        <Button name="Open Modal" onClick={() => setOpen(true)} />
      </div>

      <div style={{ marginTop: 12, width: 280 }}>
        <Input placeholder="Email" type="text" />
      </div>

      <div style={{ marginTop: 12, width: 280 }}>
        <Select 
          placeholder="Role" 
          options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]} 
        />
      </div>

      <Modal
        width="30%"
        open={open}
        onCancel={() => setOpen(false)}
        title="Sample Modal"
        footer
        closeIcon
        buttonWhiteName="Cancel"
        buttonName="Save"
        onButtonClick={() => console.log('Save')}
      >
        <div>
          <label>Modal Content</label>
          <Input placeholder="Type here" type="text" />
        </div>
      </Modal>
    </div>
  );
}

export default Example;
```


### Usage by component

- Button
  - Props: `name`, `onClick?`, `disabled?`, `isLoading?`, `loader?`, `btnWidth?`, `marginBottom?`
  - Example:
    ```jsx
    <Button name="Save" onClick={() => {}} isLoading={false} />
    ```

- ButtonWhite / ButtonWhiteOutline
  - Props: `name`, `onClick?`, `disabled?`, `isSelected?`, `btnWidth?`, `style?`, `pointer?`
  - Example:
    ```jsx
    <ButtonWhite name="Cancel" />
    <ButtonWhiteOutline name="Back" isSelected />
    ```

- Input
  - Props: `type? ('text'|'password')`, `placeholder?`, `value?`, `onChange?`, `required?`, `disabled?`, `error?`, `onBlur?`, `name?`
  - Example:
    ```jsx
    <Input placeholder="Email" type="text" />
    <Input placeholder="Password" type="password" />
    ```

- Select
  - Props: `options`, `value?`, `onChange?`, `placeholder?`, `width?`, `disabled?`, `required?`, `error?`, `showSearch?`, `borderless?`, `disabledValue?`
  - Example:
    ```jsx
    <Select
      placeholder="Role"
      options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
      showSearch
      width={280}
    />
    ```

- Checkbox
  - Props: `checked`, `onChange`, `onClick?`, `disabled?`
  - Example:
    ```jsx
    <Checkbox checked={isOn} onChange={e => setIsOn(e.target.checked)} />
    ```

- Searchbar
  - Props: `name` (placeholder), `onChange`, `value?`
  - Example:
    ```jsx
    <Searchbar name="Search..." onChange={setQuery} value={query} />
    ```

- Textarea
  - Props: `value?`, `onChange?`, `name?`, `onBlur?`
  - Example:
    ```jsx
    <Textarea placeholder="Notes" />
    ```

- ThemeSwitch
  - Props: `isOn`, `toggleTheme`
  - Example:
    ```jsx
    <ThemeSwitch isOn={isDark} toggleTheme={() => setIsDark(v => !v)} />
    ```

- Modal
  - Props: `open`, `onCancel`, `title?`, `width?`, `footer?`, `closeIcon?`, `centered?`, `position?`, `buttonWhiteName?`, `buttonName?`, `onButtonClick?`, `disabled?`, `deleteModal?`
  - Example:
    ```jsx
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Confirm"
      buttonWhiteName="Cancel"
      buttonName="Save"
      onButtonClick={() => console.log('Save')}
    >
      <div>Are you sure?</div>
    </Modal>
    ```

- CustomTab
  - Controlled tabs built on MUI Tabs
  - Props: `value`, `handleChange`, `TabButton`, `ariaLabel?`, `Tab`, `variant?`, `scrollButtons?`, `className?`, `width?`
  - Example:
    ```jsx
    <CustomTab
      value={tab}
      handleChange={(e, v) => setTab(v)}
      TabButton={["One", "Two"]}
      Tab={[<div key="1">Tab 1</div>, <div key="2">Tab 2</div>]}
    />
    ```

- ToolTip
  - Props: `title`, `placement?`, `children`
  - Example:
    ```jsx
    <ToolTip title="More info" placement="bottom">
      <span>Hover me</span>
    </ToolTip>
    ```

- Sidebar
  - Props: `list`, `user_name`, `logout?`, `poweredBy?`, `helpFn?`, `logo?`, `hiddenLogo?`
  - `list` item shape: `{ name: string; to: string; icon: [lightIcon, darkIcon]; locations: string[]; onClick?: () => void }`
  - Example:
    ```jsx
    <Sidebar
      user_name="john.doe@example.com"
      list={[{ name: 'Home', to: '/', icon: [lightIcon, darkIcon], locations: [''] }]}
      logout={() => {}}
      poweredBy
      helpFn={() => {}}
    />
    ```

- Loader
  - Props: `msg?`, `style?`
  - Example:
    ```jsx
    <Loader msg="Fetching data..." />
    ```

- VirtualizedTable
  - Props: `data: Array<object>`, `columns: Array<{ name: string; label: string; customWidth?: number; options?: { customBodyRender?: (value, ctx) => React.ReactNode, customHeadRender?: () => void } }>`, `height`, `width?`, `rowHeight?`, `pathname?`, `loading?`, `loaderMsg?`, `stickyColumns?`
  - Example:
    ```jsx
    const columns = [
      { name: 'name', label: 'Name' },
      { name: 'count', label: 'Count' },
    ];
    const data = [
      { name: 'Queue A', count: 10 },
      { name: 'Queue B', count: 5 },
    ];
    <VirtualizedTable data={data} columns={columns} height={400} />
    ```

- VirtualizedTableSC
  - Same as `VirtualizedTable` plus: `footerButton?`, `footerButtonText?`, `footerButtonOnClick?`
  - Example:
    ```jsx
    <VirtualizedTableSC
      data={data}
      columns={columns}
      height={400}
      stickyColumns={1}
      footerButton
      footerButtonText="Add Rules"
      footerButtonOnClick={() => console.log('Add Rules')}
    />
    ```


### Virtualized table example

```jsx
import { VirtualizedTableSC } from '@intain_tech/component';

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'count', label: 'Count' },
];

const data = [
  { name: 'Queue A', count: 10 },
  { name: 'Queue B', count: 5 },
];

<VirtualizedTableSC
  data={data}
  columns={columns}
  height={400}
  stickyColumns={1}
  footerButton
  footerButtonText="Add Rules"
  footerButtonOnClick={() => console.log('Add Rules')}
/>;
```


### Theming and customization

This library uses CSS variables for design tokens and supports light/dark modes. The default variables live on `:root`; dark mode overrides apply when `[dark-theme="dark"]` is present on the root element.

Toggle theme by setting an attribute on `html` or `body`:

```js
document.documentElement.setAttribute('dark-theme', 'dark');   // enable dark
document.documentElement.setAttribute('dark-theme', 'light');  // disable dark
```

Override any token in your app-level CSS to customize the theme:

```css
:root {
  --background-color: #ffffff;
  --text-color: #222222;
  --select-arrow: #018e82;
}

[dark-theme='dark'] {
  --background-color: #121212;
  --text-color: rgba(255,255,255,0.87);
}
```

Commonly used variables include `--background-color`, `--text-color`, `--button-white`, `--select-arrow`, `--tooltip-bg`, and `--error-border`.


### Development

Run the included demo locally for rapid development.

```bash
git clone <your-fork-or-repo-url>
cd <repo>
npm install
npm run dev
```

- Starts a dev server using `webpack-dev-server` on port `3001`
- Opens a demo app with live reloading for components in `src/Components/*`

Build the distributable bundle:

```bash
npm run build
```

The output is written to `dist/main.js` (CommonJS2 library target).


### Publishing to npm

Prerequisites

- You must be logged in to npm with publish rights to the `@intain_tech` scope
- Ensure `package.json` version is updated and `CHANGELOG` (if any) reflects changes

Commands

```bash
# 1) Build the package (prepublishOnly runs this too)
npm run build

# 2) Bump version (choose one)
npm version patch   # or: minor | major

# 3) Publish (respects publishConfig.access)
npm publish
```

Notes

- Current `publishConfig.access` is `restricted` (private scope). To publish publicly, set it to `public`.
- `prepublishOnly` runs `npm run build` automatically before publish.


### License

Licensed under: ISC

MIT © Intain


