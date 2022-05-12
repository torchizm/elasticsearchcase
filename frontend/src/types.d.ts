declare module "elasticsearchcase" {
  export type ArticleObject = {
    _id: string;
    _index: string;
    _score: number;
    _source: Article;
  };

  export type Article = {
    url: string;
    crawled_at: string;
    _id: string;
    title: string;
    author: string;
    published_at: string;
    author_url: string;
    reading_time: number;
    total_claps: string;
    raw_description: string;
    source: string;
    description: string;
    tags: string;
    images: string[];
    modified_at: string;
  };
}
