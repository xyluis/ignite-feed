import { ImgHTMLAttributes } from 'react'

import styles from './Avatar.module.css'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

export function Avatar ({ hasBorder = true, ...props }: Props) {
  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatarWithoutBorder} 
      {...props}
    />
  )
}