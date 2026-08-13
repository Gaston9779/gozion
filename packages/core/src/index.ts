export type Variant = "default" | "primary" | "secondary" | "outline" | "ghost" | "subtle" | "destructive" | "glass";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type HoverEffect = { scale?: number; translateX?: string; translateY?: string; rotate?: string; opacity?: number; glow?: string; shadow?: string; duration?: string; easing?: string };
export type ComponentOptions = { variant?: Variant; size?: Size; disabled?: boolean; class?: string; style?: Record<string, string> };

export const componentFamilies = {
  foundations: ["ThemeProvider","Box","Flex","Grid","Stack","Center","Container","Spacer","Divider","AspectRatio","Portal","Slot"],
  typography: ["Text","Heading","Paragraph","Label","Link","Code","Kbd","Blockquote","Truncate"],
  buttons: ["Button","IconButton","ButtonGroup","CloseButton","CopyButton","FloatingActionButton"],
  forms: ["Input","Textarea","NumberInput","PasswordInput","SearchInput","InputGroup","InputAddon","FormField","FormLabel","FormDescription","FormError"],
  selection: ["Checkbox","Radio","RadioGroup","Switch","Toggle","ToggleGroup","Select","NativeSelect","MultiSelect","Combobox","Autocomplete"],
  controls: ["Slider","RangeSlider","Rating","Stepper","PinInput","OTPInput"],
  content: ["Card","InteractiveCard","HoverCard","MediaCard","StatCard","Surface","Panel","Paper"],
  navigation: ["Navbar","Sidebar","Breadcrumb","Tabs","SegmentedControl","Pagination","StepperNavigation","BottomNavigation"],
  overlays: ["Dialog","AlertDialog","Modal","Drawer","Sheet","Popover","Tooltip","DropdownMenu","ContextMenu","HoverCard"],
  feedback: ["Alert","Toast","Snackbar","Progress","CircularProgress","Spinner","Skeleton","LoadingOverlay","EmptyState","Result"],
  dataDisplay: ["Avatar","AvatarGroup","Badge","Chip","Tag","Status","Table","List","DescriptionList","Timeline","Accordion","Collapsible","TreeView"],
  media: ["Image","Figure","Carousel","Gallery","VideoContainer"],
  actions: ["Menu","MenuItem","CommandMenu","ActionMenu","SplitButton"],
  utilities: ["ScrollArea","Resizable","DropZone","FileUpload","Clipboard","FocusTrap","VisuallyHidden"],
  primitives: ["Hoverable","Pressable","GlassSurface","GradientSurface","Glow","BlurSurface","AnimatedBorder","Shine","Spotlight","Mask","Overlay"]
} as const;

export function hoverStyle(effect: HoverEffect): Record<string, string> {
  return { "--ui-hover-scale": String(effect.scale ?? 1), "--ui-hover-x": effect.translateX ?? "0", "--ui-hover-y": effect.translateY ?? "0", "--ui-hover-rotate": effect.rotate ?? "0", "--ui-hover-opacity": String(effect.opacity ?? 1), "--ui-hover-shadow": effect.shadow ?? effect.glow ?? "var(--ui-shadow)", "--ui-hover-duration": effect.duration ?? "var(--ui-transition-duration)", "--ui-hover-easing": effect.easing ?? "var(--ui-easing)" };
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const items = [...container.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((el) => !el.hidden);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

export function getFloatingPlacement(anchor: DOMRect, floating: DOMRect, viewport = window): "top" | "bottom" {
  return viewport.innerHeight - anchor.bottom >= floating.height || anchor.top < floating.height ? "bottom" : "top";
}
