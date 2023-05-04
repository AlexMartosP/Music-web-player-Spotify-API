import useSWR from "swr";
import defaultImage from "../../../../assets/default_playlist.jpg";
import Card from "../../../../components/ui/Card";
import Heading2 from "../../../../components/ui/Heading2";
import { SkeletonCard } from "../../../../components/ui/Skeletons";
import SkeletonH2 from "../../../../components/ui/Skeletons/SkeletonH2";
import Slider from "../../../../components/ui/Slider";
import { base_api_url } from "../../../../config/api";
import {
  getBrowseGenres,
  getFeaturedPlaylists,
} from "../../../../services/URLCreators";
import { selectCurrentUser } from "../../../../slices/auth";
import { useAppSelector } from "../../../../store/hooks";
import { GenrePlaylists, MultipleGenres } from "../../../../types/genre";
import { Grid } from "../../../Genre/Genre.styles";

function NoSearch() {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, error } = useSWR<[GenrePlaylists, MultipleGenres]>({
    urls: [
      base_api_url + getFeaturedPlaylists(user.country, "8"),
      base_api_url + getBrowseGenres(user.country, "20"),
    ],
  });

  return (
    <>
      {!isLoading ? (
        <>
          {data && !error && (
            <>
              <div className="flow">
                <Heading2>Featured playlists</Heading2>
                <Slider className="flow-xs">
                  {data[0].playlists.items.map((playlist) => {
                    if (!playlist) return null;

                    return (
                      <Card
                        key={playlist.id}
                        image={
                          playlist.images.length > 0
                            ? playlist.images[0].url
                            : defaultImage
                        }
                        title={playlist.name}
                        link={`/playlist/${playlist.id}`}
                      />
                    );
                  })}
                </Slider>
              </div>
              <div className="flow-sm">
                <Heading2>Browse genres</Heading2>
                <Grid>
                  {data[1].categories.items.map((genre) => (
                    <Card
                      key={genre.id}
                      image={
                        genre.icons.length > 0
                          ? genre.icons[0].url
                          : defaultImage
                      }
                      title={genre.name}
                      link={`/genre/${genre.id}`}
                    />
                  ))}
                </Grid>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flow">
            <SkeletonH2 />
            <Slider>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </Slider>
          </div>
          <div className="flow-sm">
            <SkeletonH2 />
            <Grid>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </Grid>
          </div>
        </>
      )}
    </>
  );
}

export default NoSearch;
