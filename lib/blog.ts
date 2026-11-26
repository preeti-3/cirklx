export const latestPosts = [
  { slug: "the-power-of-branding", image: "/figma/blog-branding.png", date: "11 Nov 2026", title: "The Power of Branding", description: "Discover how a strong brand identity helps businesses stand out and build lasting customer trust." },
  { slug: "design-that-drives-growth", image: "/figma/blog-design.png", date: "02 Nov 2026", title: "Design That Drives Growth", description: "Explore how thoughtful website design creates better user experiences and drives business growth." },
  { slug: "marketing-that-makes-impact", image: "/figma/blog-marketing.png", date: "06 Nov 2026", title: "Marketing That Makes Impact", description: "Learn how creative campaigns and smart digital strategies can help your brand reach the right audience." },
] as const;

export type BlogSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type BlogPost = {
  slug: string; image: string; date?: string; published?: string;
  title: string; description: string; category: string;
  sections: BlogSection[]; takeaway: string;
};

const articles: { category: string; published: string; sections: BlogSection[]; takeaway: string }[] = [
  {
    category: "Branding", published: "2026-11-11",
    sections: [
      { heading: "Start with a clear promise", paragraphs: ["A brand starts with the experience you want people to remember. Before choosing a logo or a color palette, define who you help, the problem you solve, and what makes your approach useful to that audience.", "Write that promise in plain language. It should be specific enough to guide the decisions you make about your website, your content, and the way you speak with customers."] },
      { heading: "Build recognition through consistency", paragraphs: ["Your visual identity gives that promise a recognizable form. Use a small set of colors, clear typography, and a consistent approach to photography. The aim is to make each touchpoint feel like it belongs to the same business."], bullets: ["Use the same logo and profile image across your channels.", "Create reusable layouts for recurring content formats.", "Keep your tone consistent while adapting each message to its platform."] },
      { heading: "Make the experience match the identity", paragraphs: ["A polished feed creates an expectation. Your enquiry process, delivery, and customer support need to support it. Start by reviewing the path from a social post to your website and then to a conversation with your team.", "Look for confusing messages, inconsistent details, or steps that make customers repeat themselves. Improving those moments is part of building a brand people can trust."] },
    ],
    takeaway: "A memorable brand repeats a clear promise—and follows through on it.",
  },
  {
    category: "Design", published: "2026-11-02",
    sections: [
      { heading: "Give every page a purpose", paragraphs: ["Good website design helps a visitor make progress. Decide what someone needs to understand on each page and which action should follow. A portfolio page might help them judge your work; a service page should explain what you offer and how to enquire.", "Put the most useful information first. Clear headings, focused examples, and a visible next step make a page easier to use than a collection of competing messages."] },
      { heading: "Design for a phone first", paragraphs: ["Work through the page on a small screen with real text and images. Check that the navigation is reachable, the text is comfortable to read, and controls are large enough to tap."], bullets: ["Keep forms short and label every field.", "Make galleries swipeable without interrupting vertical scrolling.", "Reserve space for images so the page does not jump as they load.", "Respect reduced-motion preferences and provide clear keyboard focus."] },
      { heading: "Improve the moments where people hesitate", paragraphs: ["Ask someone unfamiliar with your business to find a service, browse a project, and contact you. Watch where they pause or make the wrong choice. Those moments reveal useful improvements that a visual review alone can miss.", "Review enquiries and page interactions alongside that feedback. Change one clear problem at a time, then check whether the experience became easier."] },
    ],
    takeaway: "Design earns its place by making the next useful step easier.",
  },
  {
    category: "Marketing", published: "2026-11-06",
    sections: [
      { heading: "Choose an audience and a goal", paragraphs: ["A campaign becomes easier to plan when you know who it is for and what you want them to do. Introduce a new service, answer a buying question, or invite people to an event—then build your message around that specific purpose.", "Use the language your audience uses. Customer conversations and frequently asked questions are useful starting points for content that addresses an actual need."] },
      { heading: "Connect the content to the next step", paragraphs: ["A strong creative idea should lead somewhere useful. A product demonstration can lead to product details. A behind-the-scenes video can lead to your portfolio. An invitation should lead directly to event information."], bullets: ["Make the opening frame explain why the content matters.", "Show a concrete example rather than relying on broad promises.", "Use one clear call to action that matches the message."] },
      { heading: "Learn from the response", paragraphs: ["Views describe exposure, but they do not tell the whole story. Consider saves, replies, enquiries, and the quality of the conversations a campaign starts. Compare those signals with the goal you chose at the beginning.", "Keep the formats that help your audience and revise the ones that leave people confused. A repeatable process of planning, publishing, and reviewing is more useful than treating every post as a fresh guess."] },
    ],
    takeaway: "Give the right audience a clear reason to pay attention—and a useful next step.",
  },
];

export const additionalPosts: BlogPost[] = [
  {
    slug: "social-media-marketing-trends-2026", image: "/social-media-marketing-trends-2026.webp", title: "Social Media Marketing Trends for 2026", category: "Social Media",
    description: "A practical framework for deciding which content trends deserve a place in your strategy.",
    sections: [
      { heading: "Filter trends through your audience", paragraphs: ["A popular format is only useful when it helps you say something relevant. Before adapting a trend, ask whether your audience will understand the reference and whether the format fits your brand's voice."] },
      { heading: "Keep a repeatable content foundation", paragraphs: ["Build your calendar around useful themes: customer questions, demonstrations, your process, and examples of your work. Use trends to vary the presentation without replacing the ideas your audience comes to you for."], bullets: ["Choose a few repeatable formats.", "Leave space to test timely ideas.", "Review results against the purpose of each post."] },
      { heading: "Test before committing", paragraphs: ["Try a format with a small batch of content, then review how people respond. Keep a record of the topic, opening frame, and call to action so you can distinguish a useful pattern from a single unusual result."] },
    ], takeaway: "Use trends as a format for a useful idea, not as a substitute for one.",
  },
  {
    slug: "ai-content-creation-social-media", image: "/ai-content-creation-social-media.webp", title: "AI Content Creation for Social Media", category: "Content Creation",
    description: "Use AI to support your creative process while keeping the content specific to your brand.",
    sections: [
      { heading: "Start with a useful brief", paragraphs: ["Give your content process a clear audience, purpose, and source material. Your own product details, customer questions, and brand guidelines make a better starting point than a generic request for ideas."] },
      { heading: "Keep human review in the workflow", paragraphs: ["AI can help explore outlines, alternative hooks, and draft captions. Review the output for accuracy, tone, and originality before it becomes part of your published content."], bullets: ["Check product descriptions and factual claims.", "Replace generic wording with concrete examples.", "Review image details and any text inside generated visuals."] },
      { heading: "Use the time saved for better creative decisions", paragraphs: ["Spend less time starting from a blank page and more time choosing the right idea, improving the footage, and listening to your audience. The final content should reflect your experience and your brand's point of view."] },
    ], takeaway: "Let AI support the process; keep your judgment in charge of the final result.",
  },
  {
    slug: "social-search-optimization", image: "/social-search-optimization.webp", title: "How Social Search Optimization Works", category: "Content Strategy",
    description: "Make your profile and content easier to understand when people are looking for what you offer.",
    sections: [
      { heading: "Use the words your audience uses", paragraphs: ["Start with the questions people ask about your service. Turn those questions into clear content topics and describe what you do in direct language. Specific descriptions are more useful to a visitor than a bio full of broad claims."] },
      { heading: "Make each post understandable on its own", paragraphs: ["Give a viewer enough context to understand the subject without having seen your earlier posts. Use a clear title, readable captions, and an explanation that follows through on the opening promise."], bullets: ["Name the topic clearly in your caption.", "Keep your business and location information consistent.", "Organize related content so a visitor can explore the subject further."] },
      { heading: "Review the questions that remain", paragraphs: ["Use comments and enquiries to find gaps in your explanations. Update unclear profile details and create follow-up content where people need more help. Treat discoverability and usefulness as parts of the same task."] },
    ], takeaway: "Describe what you offer clearly, then make the content useful to the person who finds it.",
  },
];

export const blogPosts: BlogPost[] = [
  ...latestPosts.map((post, index) => ({ ...post, ...articles[index] })),
  ...additionalPosts,
];
