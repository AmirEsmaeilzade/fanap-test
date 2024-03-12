import { TypographyOptions } from '@mui/material/styles/createTypography'

interface TypographyType {
  fontFamily: string
  fontWeight: string
  fontSize: string
  lineHeight: string

  [key: string]: string
}

export interface CustomTypographyOptions extends TypographyOptions {
  text?: TypographyType
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    text: true
  }
}

export const typography: CustomTypographyOptions = {
  text: {
    fontFamily: 'IRANSansX',
  },
} as CustomTypographyOptions
