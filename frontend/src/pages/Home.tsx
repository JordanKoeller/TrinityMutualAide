import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardDeck, InfoCard } from '../components/InfoCard';
import { TextJumbotron } from '../components/Jumbotron';
import { TopSpacer } from '../components/TopSpacer';
const Home: React.FC = () => {
    const { t } = useTranslation(undefined, {useSuspense: false});
    return <div>
        <TopSpacer />
        <TextJumbotron variant="light" i18nKey="pages.About.0" />
        <TextJumbotron variant="dark" i18nKey="pages.About.1" />
        <TextJumbotron variant="light" i18nKey="pages.About.2" />
        <h1 className="jumbotron-title">{t('tmaInNews')}</h1>
        <CardDeck fluid={true}>
            <InfoCard title="Trinity Mutual Aid raises $3000 at community market" href="https://trinitonian.com/2021/09/23/trinity-mutual-aid-raises-3000-at-community-market/#">
                <img alt="" src="https://trinitonian.com/wp-content/uploads/2021/09/eS3vaotZqzCpmJKpblhGgJhrQeJlkHqR44IRpRfF-900x600.jpeg" width="100%" />
                <p>
                    If you walked into What’s Brewing Roastery and Cafe on Saturday, Sept. 11, you would have imme...
                </p>
            </InfoCard>
            <InfoCard title="Texas Storm and COVID Are Dual Traumas for th..." href="https://www.teenvogue.com/story/texas-winter-storm-young-people">
                <img alt="" src="Sophie-Ryland.png" width="100%" />
                <p>
                    Sophie Ryland is sad - about the pandemic, about the unprecedented winter stor...
                </p>
            </InfoCard>
            <InfoCard title="Texans rally to help neighbors amid big freeze as officials..." href="https://www.theguardian.com/us-news/2021/feb/21/texas-volunteers-neighbors-mutual-aid">

                <img alt="" width="100%" src="https://i.guim.co.uk/img/media/75047217cfa319f0eea7d349bd911b8422ea7435/0_0_5472_3648/master/5472.jpg?width=1020&quality=85&auto=format&fit=max&s=5b85bf963cbfb343d193f460f32e005d" />
                <p>
                    With huge gaps in the state and local response to the winter crisis, volunteers are stepping up...
                </p>
            </InfoCard>
        </CardDeck>
        <CardDeck fluid={true}>
            <InfoCard title="Through the Storms and Beyond" href="https://www.trinity.edu/trinity-magazine/spring-2021/through-storms-and-beyond">
                <img alt="" width="100%" src="https://www.trinity.edu/sites/default/files/styles/media_970x520/public/acquiadam/2021-04/mutual-aid.jpeg?itok=CsTYpFrw" />
                <p>
                    Trinity Mutual Aid raises more than $110,000 for San Antonio community members in need during winter storm...
                </p>
            </InfoCard>
            <InfoCard title="Trinity Mutual Aid raises over $100,000 in four days" href="https://trinitonian.com/2021/03/10/trinity-mutual-aid-raises-over-100000-in-four-days/">
                <img alt="" width="100%" src="https://trinitonian.com/wp-content/uploads/2021/03/TzZJLeE5AVhSmuP6KdWaG9iCXE5cvmE8QdcwAZko-900x600.jpeg" />
                <p>
                    The COVID-19 pandemic, coupled with the devastating winter storm, has left some of the Trinity com...
                </p>
            </InfoCard>
            <InfoCard title="Where to Donate to Help People in Need..." href="https://www.rollingstone.com/culture/culture-news/texas-blackout-mutual-aid-donation-1129703/">
                <img alt="" width="100%" src="https://www.rollingstone.com/wp-content/uploads/2021/02/AP21046734761892c.jpg?resize=1800,1200&w=1200" />
                <p>
                    Texas is currently facing an unprecedented blackout crisis, leaving nearly three million peop...
                </p>
            </InfoCard>
        </CardDeck>
    </div>
}

export default Home;