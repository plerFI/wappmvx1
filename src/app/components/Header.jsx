import React from 'react'
import Image from "next/image";

function Header() {
	return (
		<header className="flex flex-col items-center mb-10 md:mb-15 mt-0.5">
			<Image
	src="/VaultFILogo.png"
	alt="VaultFI Logo"
	width={150}
	height={150}
	style={{
		filter: "drop-shadow(0px 0px 15px var(--themeGreen))",
	}}
/>

			<h1 className="text-2xl md:text-6xl font-bold tracking-tighter mb-6 text-[#32CD32]">
				Vault
				<span className="inline-block -skew-x-6 text-[#1E90FF]">
				FI
				</span>
			</h1>

			<p className="text-white text-base">
				Click on{" "}
				<code className="bg-[#282828] text-white px-2 rounded py-1 text-sm mx-1">
					 Launch Vault / Documentation
				</code>{" "}
				to get started.
			</p>
		</header>
	);
}

export default Header;