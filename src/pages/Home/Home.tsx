import { Link } from "react-router-dom";
import useSWR from "swr";
import withNetwork from "../../HOC/withNetwork";
import Card from "../../components/ui/Card";
import {
  default as CardList,
  default as Slider,
} from "../../components/ui/Slider";
import IncludeSaving from "../../components/IncludeSaving";
import SingleTrack from "../../components/SingleTrack";
import { base_api_url } from "../../config/api";
import BREAKPOINTS from "../../constants/breakpoints";
import Button from "../../components/ui/Button";
import Heading2 from "../../components/ui/Heading2";
import useWindowSize from "../../hooks/useWindowSize";
import {
  getCurrentUserPlaylists,
  getTopItems,
} from "../../services/URLCreators";
import { SingleArtistType } from "../../types/artist";
import { PlaylistListType } from "../../types/playlist";
import { SingleTrackType } from "../../types/track";
import formatDate from "../../helpers/formatDate";
import { Flex, Flow, Grid, Heading } from "./Home.styles";
import HomeLoading from "./loading";

function Home() {
  const { data, isLoading, error } = useSWR({
    urls: [
      base_api_url + getCurrentUserPlaylists("6"),
      base_api_url + getTopItems("tracks", "8"),
      base_api_url + getTopItems("artists", "6"),
    ],
  });
  const { width } = useWindowSize();

  function getGreeting() {
    const hours = new Date().toLocaleTimeString().split(":")[0];

    if (hours > "04" && hours <= "12") {
      return "Good morning";
    } else if (hours > "12" && hours <= "17") {
      return "Good afternoon";
    } else if (hours >= "18") {
      return "Good evening";
    }
  }

  let hasData = false;
  if (data) {
    if (data[0].total > 0 || data[1].total > 0 || data[2].total > 0) {
      hasData = true;
    }
  }

  return (
    <>
      <Heading>{getGreeting()}</Heading>
      {!isLoading ? (
        <>
          {!error && data && (
            <>
              {hasData ? (
                <>
                  <Flex>
                    {data[0].total > 0 && (
                      <div>
                        {width < BREAKPOINTS.laptop ? (
                          <Slider>
                            {data[0].items.map((item: PlaylistListType) => (
                              <Card
                                key={item.id}
                                image={
                                  item.images.length > 0
                                    ? item.images[0].url
                                    : ""
                                }
                                link={`/playlist/${item.id}`}
                                title={item.name}
                                subTitle={`by ${item.owner.display_name}`}
                              />
                            ))}
                          </Slider>
                        ) : (
                          <Grid fixedCols={3}>
                            {data[0].items.map((item: PlaylistListType) => (
                              <Card
                                key={item.id}
                                image={
                                  item.images.length > 0
                                    ? item.images[0].url
                                    : ""
                                }
                                link={`/playlist/${item.id}`}
                                title={item.name}
                                subTitle={`by ${item.owner.display_name}`}
                              />
                            ))}
                          </Grid>
                        )}
                      </div>
                    )}
                    {data[1].total > 0 && (
                      <div>
                        {width < BREAKPOINTS.laptop && (
                          <Heading2>Your top tracks</Heading2>
                        )}
                        <IncludeSaving
                          ids={data[1].items.map(
                            (item: SingleTrackType) => item.id
                          )}
                        >
                          {data[1].items.map(
                            (item: SingleTrackType, index: number) => (
                              <SingleTrack
                                key={item.id}
                                index={index}
                                trackData={item}
                                secondMeta={formatDate(
                                  item.album!.release_date
                                )}
                              />
                            )
                          )}
                        </IncludeSaving>
                      </div>
                    )}
                  </Flex>
                  {data[2].total > 0 && (
                    <Flow>
                      <Heading2>Top artists</Heading2>
                      {width < BREAKPOINTS.laptop ? (
                        <CardList>
                          {data[2].items.map((item: SingleArtistType) => (
                            <Card
                              key={item.id}
                              image={
                                item.images.length > 0 ? item.images[0].url : ""
                              }
                              link={`/artist/${item.id}`}
                              title={item.name}
                            />
                          ))}
                        </CardList>
                      ) : (
                        <Grid>
                          {data[2].items.map((item: SingleArtistType) => (
                            <Card
                              key={item.id}
                              image={
                                item.images.length > 0 ? item.images[0].url : ""
                              }
                              link={`/artist/${item.id}`}
                              title={item.name}
                              horizontal
                            />
                          ))}
                        </Grid>
                      )}
                    </Flow>
                  )}
                </>
              ) : (
                <div className="flow-sm">
                  <Heading2>Oops... no data</Heading2>
                  <Button className="flow-xxs" as={Link} to="/search">
                    Browse tracks
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <HomeLoading />
      )}
    </>
  );
}

export default withNetwork(Home);
