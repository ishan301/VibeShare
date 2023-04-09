import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url";

export const client = new SanityClient({
    projectId: `${process.env.REACT_APP_SANITY_PROJECT_ID}`,
    dataset: 'production',
    useCdn: true,
    apiVersion: "2023-04-09",
    token: process.env.REACT_APP_SANITY_TOKEN
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);