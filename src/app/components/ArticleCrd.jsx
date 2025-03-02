import React  from "react";
import ArticleCard from '../components/ArticleCard'

function ArticleCrd() {
    return (
        <div className="grid gap-4 lg:grid-cols-2 justify-center">
			<ArticleCard
				title="Launch Vault"
				href="/metavault"
				description="Get the maximum out of your USDC"
			/>

			<ArticleCard
				title="Documentation"
				href="/docs"
				description="Learn why AuctOZ exists and how it works"
			/>
		</div>
	);
}

export default ArticleCrd