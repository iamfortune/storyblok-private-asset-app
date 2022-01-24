import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
	accessToken: '5BtK7LI8vieGBr4TMQxDNwtt', // Replace this with your access token
	cache: {
		clear: "auto",
		type: "memory",
	},
});

const urls = [
	"https://a.storyblok.com/f/143584/505x296/30f21e589b/screenshot-from-2022-01-20-17-04-41.png",
	"https://a.storyblok.com/f/143584/504x295/35d4fa30b1/screenshot-from-2022-01-20-17-05-55.png",
	"https://a.storyblok.com/f/143584/1083x274/7a46a78f34/screenshot-from-2022-01-10-00-14-59.png",
];

const App = () => {
	const [assets, setAssets] = useState([]);

	useEffect(() => {
		setAssets([]);

		const fetchSpace = async (fileURL) => {
			try {
				const res = await Storyblok.get("cdn/assets/me", {
					filename: fileURL,
				});

				setAssets((prevState) => [
					...prevState,
					{
						url: res?.data?.asset?.signed_url,
						alt: res?.data?.asset?.alt,
						title: res?.data?.asset?.title,
					},
				]);
			} catch (error) {
				console.log(error);
			}
		};

		urls?.forEach(async (url) => {
			await fetchSpace(url);
		});
	}, []);

	return (
		<div>
			<h2>Private Asset Test App</h2>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{assets?.map((asset) => (
					<div style={{ width: 450, height: 300, margin: "1rem" }}>
						<img
							style={{ display: "block", width: "100%", height: "100%" }}
							src={asset?.url}
							alt={asset?.url}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
