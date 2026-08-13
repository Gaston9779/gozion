import * as React from "react";
import { getFloatingPlacement, hoverStyle, type HoverEffect, type Size, type Variant } from "@gozion-ui/core";
import { themeVariables, type ThemeName } from "@gozion-ui/tokens";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;
type BaseProps = { variant?: Variant; size?: Size; className?: string; style?: React.CSSProperties; children?: React.ReactNode };
const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ");
const vars = (style?: CSSVars) => style;

export function ThemeProvider({ theme = "default", overrides, children }: { theme?: ThemeName; overrides?: Record<string,string>; children: React.ReactNode }) {
  return <div data-ui-theme={theme} style={themeVariables(theme, overrides) as CSSVars}>{children}</div>;
}
export const Box = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cx("ui-component", className)} style={vars(style as CSSVars)} {...props} />;
export const Flex = ({ gap, style, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { gap?: string }) => <Box className={cx("ui-flex", className)} style={{ gap, ...style } as CSSVars} {...props} />;
export const Stack = ({ gap = "var(--ui-space-3)", ...props }: React.HTMLAttributes<HTMLDivElement> & { gap?: string }) => <Flex className="ui-stack" gap={gap} {...props} />;
export const Grid = ({ columns = "repeat(auto-fit, minmax(14rem, 1fr))", style, ...props }: React.HTMLAttributes<HTMLDivElement> & { columns?: string }) => <Box className="ui-grid" style={{ gridTemplateColumns: columns, gap: "var(--ui-space-4)", ...style } as CSSVars} {...props} />;
export const Center = (props: React.HTMLAttributes<HTMLDivElement>) => <Box className="ui-center" {...props} />;
export const Container = ({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) => <Box style={{ width: "min(100% - 2rem, 72rem)", marginInline: "auto", ...style } as CSSVars} {...props} />;
export const Divider = (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="ui-divider" {...props} />;
export const VisuallyHidden = (props: React.HTMLAttributes<HTMLSpanElement>) => <span className="ui-sr-only" {...props} />;
export function Button({ variant = "default", size = "md", className, style, type = "button", ...props }: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button type={type} className={cx("ui-component ui-focusable ui-button", className)} data-variant={variant} data-size={size} style={vars(style as CSSVars)} {...props} />; }
export function IconButton({ label, children, ...props }: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & BaseProps & { label: string }) { return <Button aria-label={label} className="ui-icon-button" {...props}>{children}</Button>; }
export const CloseButton = (props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">) => <Button aria-label="Close" {...props}>×</Button>;
export function CopyButton({ value, ...props }: { value: string } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">) { const [copied, setCopied] = React.useState(false); return <Button onClick={async () => { await navigator.clipboard.writeText(value); setCopied(true); }} {...props}>{copied ? "Copied" : "Copy"}</Button>; }
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) { return <input className={cx("ui-input ui-focusable", className)} {...props} />; }
export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={cx("ui-input ui-focusable", className)} {...props} />; }
export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cx("ui-input ui-focusable", className)} {...props} />; }
export function Checkbox({ children, className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) { return <label className={cx("ui-focusable", className)}><input type="checkbox" {...props} /> {children}</label>; }
export function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange(checked:boolean): void; label: string; disabled?: boolean }) { return <label><input className="ui-sr-only" type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={e=>onChange(e.currentTarget.checked)} /><span aria-hidden="true" className="ui-component ui-button" data-variant={checked ? "primary" : "subtle"}>{label}</span></label>; }
export type CardProps = BaseProps & React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean; title?: React.ReactNode; actions?: React.ReactNode };
export function Card({ variant = "default", className, disabled = false, title, actions, children, onClickCapture, onKeyDownCapture, ...props }: CardProps) {
  return <Box className={cx("ui-card", className)} data-variant={variant} data-disabled={disabled || undefined} aria-disabled={disabled || undefined}
    onClickCapture={(event) => { if (disabled) { event.preventDefault(); event.stopPropagation(); return; } onClickCapture?.(event); }}
    onKeyDownCapture={(event) => { if (disabled) { event.preventDefault(); event.stopPropagation(); return; } onKeyDownCapture?.(event); }} {...props}>
    {(title || actions) && <header className="ui-card-header"><div className="ui-card-title">{title}</div>{actions}</header>}{children}
  </Box>;
}
export function CardMenu({ label = "Card actions", children }: { label?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  return <div className="ui-card-menu" ref={ref}><IconButton label={label} aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen(value => !value)}>•••</IconButton>{open && <div className="ui-card-menu-content" role="menu" onClick={() => setOpen(false)}>{children}</div>}</div>;
}
export const CardMenuItem = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button type="button" role="menuitem" className={cx("ui-card-menu-item", className)} {...props} />;
export type TableColumn = { key: string; header: React.ReactNode; render?: (row: Record<string, React.ReactNode>) => React.ReactNode };
export type TableProps = Omit<React.TableHTMLAttributes<HTMLTableElement>, "children"> & { columns?: TableColumn[]; rows?: Array<Record<string, React.ReactNode> & { id?: string }>; onRowClick?: (row: Record<string, React.ReactNode>) => void; rowActions?: (row: Record<string, React.ReactNode>) => React.ReactNode; children?: React.ReactNode };
export function Table({ className, columns, rows, onRowClick, rowActions, children, ...props }: TableProps) {
  return <div className="ui-table-scroll"><table className={cx("ui-table", className)} {...props}>{columns?.length && rows ? <><thead><tr>{columns.map(column => <th key={column.key}>{column.header}</th>)}{rowActions && <th aria-label="Actions" />}</tr></thead><tbody>{rows.map((row,index) => <tr key={String(row.id ?? index)} onClick={() => onRowClick?.(row)}>{columns.map(column => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}{rowActions && <td onClick={event => event.stopPropagation()}>{rowActions(row)}</td>}</tr>)}</tbody></> : children}</table></div>;
}
export const TableHeader = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
export const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
export const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />;
export const TableHead = (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th {...props} />;
export const TableCell = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td {...props} />;
export const Alert = ({ variant = "default", className, ...props }: BaseProps & React.HTMLAttributes<HTMLDivElement>) => <Box role="status" className={cx("ui-alert", className)} data-variant={variant} {...props} />;
export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span className={cx("ui-badge", className)} {...props} />;
export const Kbd = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <kbd className={cx("ui-kbd", className)} {...props} />;
export function KbdShortcut({ keys, label = "Press", className }: { keys: React.ReactNode[]; label?: React.ReactNode; className?: string }) { return <span className={cx("ui-kbd-shortcut", className)}><span>{label}</span><span>{keys.map((key,index)=><React.Fragment key={index}>{index > 0 && <i aria-hidden="true">+</i>}<Kbd>{key}</Kbd></React.Fragment>)}</span></span>; }
export function Hoverable({ effect, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { effect?: HoverEffect }) { return <Box className={cx("ui-hoverable", className)} style={{ ...hoverStyle(effect ?? {}), ...style } as CSSVars} {...props} />; }
export const GlassSurface = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <Box className={cx("ui-card", className)} data-variant="glass" {...props} />;
export const GradientSurface = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <Box className={cx("ui-gradient-surface", className)} {...props} />;
export const Glow = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <Box className={cx("ui-glow", className)} {...props} />;
export function Dialog({ open, onClose, title, children }: { open: boolean; onClose(): void; title: string; children: React.ReactNode }) { const ref = React.useRef<HTMLDialogElement>(null); React.useEffect(() => { const d=ref.current; if (!d) return; open ? d.showModal() : d.close(); }, [open]); return <dialog ref={ref} aria-labelledby="ui-dialog-title" onCancel={(e)=>{e.preventDefault();onClose();}} className="ui-component ui-card"><h2 id="ui-dialog-title">{title}</h2>{children}<CloseButton onClick={onClose}/></dialog>; }
export function Tooltip({ label, children }: { label: string; children: React.ReactElement }) { const [visible,setVisible]=React.useState(false); const [placement,setPlacement]=React.useState<"top"|"bottom">("bottom"); const anchor=React.useRef<HTMLSpanElement>(null); const tip=React.useRef<HTMLSpanElement>(null); React.useLayoutEffect(()=>{if(visible&&anchor.current&&tip.current)setPlacement(getFloatingPlacement(anchor.current.getBoundingClientRect(),tip.current.getBoundingClientRect()));},[visible]); const popupStyle = { position:"absolute", zIndex:"var(--ui-z-index-dropdown)", [placement]:"calc(100% + .5rem)", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", padding:".35rem .5rem" } as CSSVars; return <span ref={anchor} style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)} onFocus={()=>setVisible(true)} onBlur={()=>setVisible(false)}>{children}{visible&&<span ref={tip} role="tooltip" className="ui-component ui-card" style={popupStyle}>{label}</span>}</span>; }
export { type Variant, type Size, type HoverEffect };
export * from './particles/index.js';
