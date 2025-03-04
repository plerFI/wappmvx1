"use client"
import React from 'react'
import Header from '../app/components/Header'
import ArticleCrd from '../app/components/ArticleCrd'

function Home() {
	return (
		<main className="p-0 pb-10 min-h-[10vh] flex items-center justify-center container max-w-screen-lg mx-auto">
			<div className="py-0">
				<Header />
        		<ArticleCrd />
        	</div>
		</main>
	);
}

export default Home;