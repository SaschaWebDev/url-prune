# Learnings

Some note of my learnings during the development of this project

## Next.js

- In JSX the `<Head>` tag can be used to wrap in `<title>` or `<link>` for SEO and Dublin Core metadata. This can be achieved for every individual page.
- Creating more pages is as easy as writing new files into the page directory containing JSX. The file name is the url path. These routes are hardcoded.
- To create dynamic route adapting to provided ids for example can be achieved through naming a page file `[id].js`. Putting it within a folder called like the resource will make this dynamically available for all ids provided to the route.
- Creating a link with client side navigation thus no refresh of the page is as easy as `<Link href="/path"><a>Text</a></Link>`. The anchor element required no href here but the Link does!
