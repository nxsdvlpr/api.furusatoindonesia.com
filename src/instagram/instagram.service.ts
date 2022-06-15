import { Injectable } from '@nestjs/common';
import {
  IgApiClient,
  TagFeedResponseCarouselMediaItem,
  TagFeedResponseItemsItem,
} from 'instagram-private-api';

@Injectable()
export class InstagramService {
  async getFeeds(): Promise<any> {
    const ig = new IgApiClient();

    ig.state.generateDevice(process.env.IG_USERNAME);

    const user = await ig.account.login(
      process.env.IG_USERNAME,
      process.env.IG_PASSWORD,
    );

    // const userId = user.pk;

    const userIdByUsername = await ig.user.getIdByUsername('furusatoindonesia');

    const userFeed = ig.feed.user(userIdByUsername);

    // const feed = ig.feed.tag('madewithphotoshop');

    const feeds = await userFeed.items();

    return this.handleFeeds(feeds);
  }

  private handleFeeds(feeds: any) {
    const medias = [];
    const originaFeeds: TagFeedResponseItemsItem[] = feeds.filter(
      (item: TagFeedResponseItemsItem) =>
        item.media_type === 1 || item.media_type === 8,
    );

    originaFeeds.forEach((item: TagFeedResponseItemsItem) => {
      if (item.media_type === 1) {
        medias.push({
          takenAt: new Date(item.taken_at * 1000),
          mediaId: item.id,
          mediaCode: item.code,
          caption: item.caption.text,
          url: item.image_versions2.candidates[0].url,
          tags: item.caption.text.match(/#[\w]+/g),
        });
      } else if (item.media_type === 8) {
        item.carousel_media.forEach(
          (carousel: TagFeedResponseCarouselMediaItem) => {
            if (carousel.media_type === 1) {
              medias.push({
                takenAt: new Date(item.taken_at * 1000),
                mediaId: carousel.id,
                mediaCode: item.code,
                caption: item.caption.text,
                url: carousel.image_versions2.candidates[0].url,
                tags: item.caption.text.match(/#[\w]+/g),
              });
            }
          },
        );
      }
    });

    return medias;
  }
}
