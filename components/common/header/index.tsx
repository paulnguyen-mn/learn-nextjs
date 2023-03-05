import * as React from 'react'
import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'

export default function Header() {
	return (
		<>
			<HeaderMobile />
			<HeaderDesktop />
		</>
	)
}
