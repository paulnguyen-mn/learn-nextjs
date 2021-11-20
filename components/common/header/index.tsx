import * as React from 'react'
import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'

export function Header() {
	return (
		<>
			<HeaderMobile />
			<HeaderDesktop />
		</>
	)
}
