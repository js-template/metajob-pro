# PublicHeader Component

The **PublicHeader** component displays main public main-menu.

## Props

- `block`: An object containing:

   - `dark_mode`: boolean value
   - `notification`: boolean value
   - `light_logo`: An objects of data like `xs_width`, `sm_width`, `md_width`, `link` and `logo` having `url`
   - `dark_logo`: An objects of data like `xs_width`, `sm_width`, `md_width`, `link` and `logo` having `url`
   - `main_menu`: An array of object having `label`, `link`, `type` `target`, `disabled` and `child` value
   - `language`: An array of object having `label`, `link`, `type` `target`, `disabled` and `child` value
   - `user_menu`: An array of object having `label`, `link`, `type` `target`, `disabled` and `child` value
   - `button`: An objects for button data like `label`, `link`, `target`, `disabled`

- `language`: String value for language (optional)

## Usage

1. Import the `PublicHeader` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import PublicHeader from "@/ui"

const language = "en"
const blockData = {
      __component: "header.main-menu"
   dark_mode: true
   notification: true
   light_logo: {
      id: 9
       ....
}

<PublicHeader
 block={blockData}
 language={language}
/>
```
