# Intain Custom Components

A collection of reusable React components for building modern user interfaces.

## Installation

```bash
npm install intain-components
```

## Components

### 1. Button Component

A customizable button component that supports different styles and states.

#### Usage

```jsx
import { Button } from 'intain-components';

function App() {
  return (
    <Button 
      onClick={() => console.log('Button clicked')}
      variant="primary"
    >
      Click Me
    </Button>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| children | ReactNode | - | The content to be displayed inside the button |
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | The visual style variant of the button |
| onClick | function | - | Function to be called when button is clicked |
| disabled | boolean | false | Whether the button is disabled |
| className | string | - | Additional CSS classes to apply |

### 2. Searchbar Component

A search input component with customizable styling and functionality.

#### Usage

```jsx
import { Searchbar } from 'intain-components';

function App() {
  return (
    <Searchbar 
      placeholder="Search items..."
      onSearch={(value) => console.log('Search value:', value)}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| placeholder | string | 'Search...' | Placeholder text for the search input |
| onSearch | function | - | Callback function that receives the search value |
| className | string | - | Additional CSS classes to apply |
| value | string | - | Controlled input value |
| onChange | function | - | Callback for input change events |

### 3. ButtonWhite Component

A white-styled button component with support for disabled states, selection highlighting, and custom styling.

#### Usage

```jsx
import { ButtonWhite } from 'intain-components';

function App() {
  return (
    <ButtonWhite 
      name="White Button"
      onClick={() => console.log('ButtonWhite clicked')}
      disabled={false}
      isSelected={false}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| name | string | - | The text content to be displayed inside the button |
| onClick | function | - | Function to be called when button is clicked |
| disabled | boolean | false | Whether the button is disabled |
| isSelected | boolean | false | Whether the button is in selected/highlighted state |
| style | object | - | Additional inline styles to apply |
| width | string/number | - | Custom width for the button |
| pointer | string | - | Custom cursor style |

#### Features

- **Hover Effects**: Interactive hover states with color transitions
- **Disabled State**: Visual feedback for disabled buttons with opacity reduction
- **Selection Highlighting**: Special highlight styling when `isSelected` is true
- **Responsive**: Minimum width with fit-content behavior
- **Smooth Transitions**: 0.5s ease transitions for background and color changes

### 4. ButtonWhiteOutline Component

An outlined white-styled button component with support for disabled states, selection highlighting, and custom styling.

#### Usage

```jsx
import { ButtonWhiteOutline } from 'intain-components';

function App() {
  return (
    <ButtonWhiteOutline 
      name="Outline Button"
      onClick={() => console.log('ButtonWhiteOutline clicked')}
      disabled={false}
      isSelected={false}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| name | string | - | The text content to be displayed inside the button |
| onClick | function | - | Function to be called when the button is clicked |
| disabled | boolean | false | Whether the button is disabled |
| isSelected | boolean | false | Whether the button is in a selected/highlighted state |
| style | object | - | Additional inline styles to apply to the component's container |
| width | string/number | - | Custom width for the button container |
| pointer | string | - | Custom cursor style for the button |

### 5. Checkbox Component

A simple checkbox component, acting as a wrapper for the Ant Design Checkbox.

#### Usage

```jsx
import React, { useState } from 'react';
import { Checkbox } from 'intain-components';

function App() {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  return (
    <Checkbox 
      checked={checked} 
      onChange={onChange}
      disabled={false}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| onChange | function | - | Callback triggered on state change. Receives the change event object. |
| checked | boolean | - | Specifies whether the checkbox is selected. |
| onClick | function | - | Callback for click events. |
| disabled | boolean | false | If `true`, the checkbox is disabled. |

### 6. CustomTab Component

A styled wrapper around the Material-UI `Tabs` component. It provides a customized indicator and styling while accepting standard MUI `Tabs` props and `Tab` components.

#### Usage

```jsx
import React, { useState } from 'react';
import { CustomTab } from 'intain-components';
import { Tab } from '@mui/material'; // Requires @mui/material

function App() {
  const [value, setValue] = useState(0);
  const tabLabels = ['Item One', 'Item Two', 'Item Three'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomTab
      value={value}
      handleChange={handleChange}
      TabButton={tabLabels}
      ariaLabel="custom tabs example"
      variant="scrollable"
      scrollButtons="auto"
      Tab={tabLabels.map((label, index) => (
        <Tab key={index} label={label} style={{ color: 'var(--text-color)' }}/>
      ))}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| value | number | - | The index of the currently selected tab. |
| handleChange | function | - | Callback function fired when the value changes. Signature: `(event, newValue) => void`. |
| TabButton | string[] | [] | An array of tab labels, used to dynamically size the selection indicator. |
| Tab | ReactNode | - | The `Tab` components to display, typically an array of `<Tab>` from `@mui/material`. |
| ariaLabel | string | - | The `aria-label` for the `Tabs` component for accessibility. |
| variant | 'standard'\|'scrollable'\|'fullWidth' | - | The variant to use for the MUI `Tabs` component. |
| scrollButtons | boolean \| 'auto' | - | Determines the behavior of scroll buttons when `variant="scrollable"`. |
| className | string | - | Additional CSS classes to apply to the `Tabs` component. |
| width | string/number | - | Custom width for the component's `Paper` container. |

### 7. Input Component

A customizable input component that wraps Ant Design's `Input` and `Input.Password`. It supports standard and password input types, visual states for errors and disabled, and forwards refs.

#### Usage

```jsx
import React, { useState } from 'react';
import { Input } from 'intain-components';

function App() {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div>
      <Input
        name="username"
        placeholder="Standard Input"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <br />
      <Input
        type="password"
        name="password"
        placeholder="Password Input"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
       <br />
      <Input
        placeholder="Error State"
        error={true}
      />
       <br />
      <Input
        placeholder="Disabled Input"
        disabled={true}
      />
    </div>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| ref | React.Ref | - | Ref forwarded to the underlying Ant Design input element. |
| type | 'password' \| string | - | The type of input. Use `'password'` for a password field with a visibility toggle. |
| placeholder | string | - | Placeholder text for the input field. |
| onChange | function | - | Callback function triggered on value change. |
| value | string | - | The controlled value of the input. |
| required | boolean | `false` | Sets the HTML `required` attribute. |
| disabled | boolean | `false` | If `true`, the input will be disabled. |
| error | boolean | `false` | If `true`, applies error styling to the input. |
| onBlur | function | - | Callback function triggered when the input loses focus. |
| name | string | - | The `name` attribute of the input element. |

### 8. Loader Component

A loading spinner component with a customizable message, built using Ant Design's `Spin`.

#### Usage

```jsx
import { Loader } from 'intain-components';

function App() {
  return (
    <Loader msg="Please wait while we fetch the data..." />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| msg | string | 'Loading...' | The message displayed below the spinner. |
| style | object | - | Custom inline styles to apply to the loader's container. |

### 9. Modal Component

A customized wrapper for the Ant Design `Modal`. It features an optional built-in footer with cancel and confirm buttons, and a theme-aware custom close icon.

#### Usage

```jsx
import React, { useState } from 'react';
import { Modal } from 'intain-components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        title="Custom Modal Title"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={true}
        buttonWhiteName="Cancel"
        buttonName="Proceed"
        onButtonClick={() => {
          console.log('Proceed clicked!');
          setIsOpen(false);
        }}
        width="600px"
        closeIcon={true}
      >
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| open | boolean | `false` | Whether the modal is visible or not. |
| onCancel | function | - | Callback for when the modal is requested to be closed (e.g., close icon click, ESC key press, or 'Cancel' button click in custom footer). |
| footer | boolean | `null` | If `true`, renders a default footer with two buttons. If `false` or not provided, no footer is rendered. |
| title | ReactNode | - | The title content for the modal. |
| children | ReactNode | - | The content of the modal. |
| closeIcon | boolean | `undefined` | If `true`, a custom theme-aware close icon is used. Otherwise, Ant Design's default is used. |
| width | string/number | `'50%'` | The width of the modal dialog. |
| centered | boolean | `true` | Whether to vertically center the modal. |
| position | object | - | An object for custom positioning, passed to the `style` prop of the modal. |
| buttonWhiteName | string | - | The text for the secondary ('cancel') button in the custom footer. Used when `footer={true}`. |
| buttonName | string | - | The text for the primary ('confirm') button in the custom footer. Used when `footer={true}`. |
| onButtonClick | function | - | The `onClick` handler for the primary button in the custom footer. Used when `footer={true}`. |

### 10. Select Component

A styled wrapper around the Ant Design `Select` component, featuring a custom dropdown icon and styling for different states like error and disabled.

#### Usage

```jsx
import React, { useState } from 'react';
import { Select } from 'intain-components';

function App() {
  const [selectedValue, setSelectedValue] = useState(null);
  
  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'yiminghe', label: 'Yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ];

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectedValue(value);
  };

  return (
    <Select
      placeholder="Select a person"
      options={options}
      onChange={handleChange}
      value={selectedValue}
      width={200}
    />
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| options | `Array` | `[]` | An array of option objects. Example: `[{ value: 'id', label: 'Name' }]`. |
| onChange | function | - | Callback function triggered when a new option is selected. |
| value | string/number | - | The currently selected value. |
| placeholder | string | - | Placeholder text for the select input. |
| width | string/number | - | Custom width for the select component. |
| disabled | boolean | `false` | If `true`, the select is disabled. |
| error | boolean | `false` | If `true`, applies error styling by setting the component's `status` to `'error'`. |

### 11. Sidebar Component

A comprehensive, theme-aware navigation sidebar. It features integration with `react-router-dom` for navigation, a user profile popover with theme switching, and customizable navigation items.

#### Features
- **Router Integration**: Uses `react-router-dom`'s `Link` and `useLocation` to handle navigation and active link styling.
- **Theme Switching**: Built-in light/dark mode toggle that persists the theme in `sessionStorage` and applies a `dark-theme` attribute to the HTML root element.
- **Expand on Hover**: The sidebar expands on hover to show text labels for the navigation items.
- **User Profile**: An Ant Design `Popover` displays user information, a theme switch, and a logout option.
- **Customizable Items**: The main navigation links are dynamically generated from a `list` prop.

#### Usage
The `Sidebar` component is designed to be used within a `react-router-dom` `BrowserRouter`. The main content of your application should be wrapped in an element with `id="root"` for the background blur effect to work when the profile popover is open.

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from 'intain-components';

// Mock icon imports for the example
import HomeIconLight from './path/to/home-light.svg';
import HomeIconDark from './path/to/home-dark.svg';
import SettingsIconLight from './path/to/settings-light.svg';
import SettingsIconDark from './path/to/settings-dark.svg';

const Home = () => <div>Home Page Content</div>;
const Settings = () => <div>Settings Page Content</div>;

function App() {
  const navList = [
    {
      name: 'Home',
      icon: [HomeIconLight, HomeIconDark], // [light_icon, dark_icon]
      to: '/home',
      locations: ['home'], // Path segments to match for active state
    },
    {
      name: 'Settings',
      icon: [SettingsIconLight, SettingsIconDark],
      to: '/settings',
      locations: ['settings'],
    },
  ];

  const handleLogout = () => console.log('User logged out');
  const handleHelp = () => console.log('Help clicked');
  
  // Set initial theme if not present
  if (!sessionStorage.getItem("theme")) {
    sessionStorage.setItem("theme", "light");
  }

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          list={navList}
          logout={handleLogout}
          helpFn={handleHelp}
          poweredBy={true}
        />
        <main id="root" style={{ padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| list | `Array<Object>` | `[]` | An array of navigation item objects. Each object should have: `name` (string), `icon` (array of SVG imports: `[light, dark]`), `to` (string for route path), and `locations` (array of strings to match for active state). |
| logout | function | - | Callback function executed when the 'Logout' button is clicked. |
| helpFn | function | - | Callback function executed when the 'Help' item is clicked. |
| poweredBy | boolean | `false` | If `true`, displays the 'Powered by Intain' section at the bottom of the sidebar. |
| name | string | - | The key used to retrieve the user's email from `sessionStorage` for display in the profile popover. *Note: The current implementation has this hardcoded.* |

### 12. ThemeSwitch Component

A simple and elegant toggle switch component, primarily used for switching between light and dark themes. It visually represents the state with a sun or moon icon.

#### Usage

This is a controlled component. You need to manage its state and provide a callback to handle the toggle action.

```jsx
import React, { useState, useEffect } from 'react';
import { ThemeSwitch } from 'intain-components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    sessionStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("dark-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span>Light</span>
      <ThemeSwitch 
        isOn={isDarkMode} 
        toggleTheme={handleToggleTheme} 
      />
      <span>Dark</span>
    </div>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| isOn | boolean | - | A boolean to control the state of the switch (`true` for 'on'/dark, `false` for 'off'/light). |
| toggleTheme | function | - | The callback function executed when the switch is clicked. |

### 13. ToolTip Component

A wrapper around the Ant Design `Tooltip` component, providing a consistent custom style for tooltips across the application. It always displays with an arrow.

#### Usage

```jsx
import { ToolTip } from 'intain-components';

function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <ToolTip title="This is a helpful tip!" placement="top">
        <button>Hover over me</button>
      </ToolTip>
    </div>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| title | ReactNode | - | The content to be displayed inside the tooltip. |
| children | ReactNode | - | The component that the tooltip will wrap and be triggered by. |
| placement | string | `'bottom'` | The position of the tooltip relative to the target element (e.g., 'top', 'left', 'bottomRight'). |

### 14. VirtualizedTableSC Component

A high-performance, virtualized table component for displaying large datasets. It uses `react-window` for virtualization and Material-UI for styling, and supports features like sticky columns, custom cell renderers, and a loading state.

#### Features
- **Virtualization**: Efficiently renders only the visible rows, allowing for thousands of items without performance degradation.
- **Sticky Columns**: Supports fixing a specified number of columns to the left during horizontal scrolling.
- **Custom Rendering**: Allows for custom JSX to be rendered in both header and body cells.
- **Themed**: Uses a custom Material-UI theme that adapts to CSS variables for light/dark modes.
- **Loading & Empty States**: Displays a loader while data is being fetched and a message when there is no data to show.
- **Horizontal Scrolling**: Correctly handles tables that are wider than their container, with a synchronized header.

#### Dependencies
This component requires `@mui/material` and `react-window`.
```bash
npm install @mui/material @emotion/react @emotion/styled react-window
```

#### Usage
```jsx
import React from 'react';
import { VirtualizedTableSC } from 'intain-components';

// Example of a custom cell renderer
const StatusRenderer = (value) => {
  const style = {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    backgroundColor: value === 'Active' ? 'green' : 'red',
  };
  return <span style={style}>{value}</span>;
};

function App() {
  // Define columns for the table
  const columns = [
    { name: 'id', label: 'ID' }, // First column defaults to 80px
    { name: 'name', label: 'Name', customWidth: 200 },
    { name: 'email', label: 'Email', customWidth: 250 },
    { 
      name: 'status', 
      label: 'Status', 
      customWidth: 150,
      options: {
        customBodyRender: (value) => StatusRenderer(value),
      }
    },
    { name: 'city', label: 'City', customWidth: 180 },
    { name: 'country', label: 'Country', customWidth: 180 },
  ];

  // Generate a large dataset for demonstration
  const data = [];
  for (let i = 1; i <= 1000; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      status: i % 5 === 0 ? 'Inactive' : 'Active',
      city: `City ${i % 20}`,
      country: `Country ${i % 10}`
    });
  }

  return (
    <div style={{ padding: '20px' }}>
      <VirtualizedTableSC
        data={data}
        columns={columns}
        height={500}
        loading={false}
        stickyColumns={1} // Makes the 'ID' column sticky
      />
    </div>
  );
}
```

#### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| data | `Array<Object>` | `[]` | The array of data objects to display in the table. |
| columns | `Array<Object>` | `[]` | Configuration for table columns. See column object structure below. |
| height | `number` | `600` | The total height of the table component. |
| width | `string \| number` | - | The width of the table component. |
| rowHeight | `number` | `50` | The height of each row, used by `react-window`. |
| loading | `boolean` | `false` | When `true`, displays a loader or a "no data" message if data is empty. |
| loaderMsg | `string` | `''` | A custom message to display with the loading spinner. |
| stickyColumns | `number` | `0` | The number of columns from the left to make sticky during horizontal scroll. |
| pathname | `string` | `'/'` | Used internally for specific layout adjustments (e.g., adding a footer on a certain route). |

#### Column Object Structure
The `columns` prop takes an array of objects, where each object defines a column:
- `name` (string, required): The key in the data object to get the cell value from.
- `label` (string, required): The text to display in the column header.
- `customWidth` (number): The width of the column in pixels. Defaults to `150px` (except the first column which is `80px`).
- `options` (object):
    - `customBodyRender(value, { rowIndex, rowData })`: A function that returns custom JSX for a body cell.
    - `customHeadRender()`: A function that acts as an `onClick` handler for the header cell.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Intain
