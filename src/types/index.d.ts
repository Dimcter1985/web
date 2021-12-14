declare type IconProps = IIconProps & React.SVGProps<SVGSVGElement>

declare type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

declare type TextAreaInputProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

declare type TextProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

declare type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

declare type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

declare type PressableProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

declare type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

declare type TextFieldChange = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

declare type KeyDownEvent<T = HTMLElement> = KeyboardEventHandler<T>

declare type SVGProps = React.SVGProps<SVGSVGElement>
