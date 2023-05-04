import { useParams } from "react-router-dom";
// SWR
import useSWR from "swr";
// Config
import { base_api_url } from "../../../../config/api";
// Services
import { getRelatedArtists } from "../../../../services/URLCreators";
// Components
import Card from "../../../../components/ui/Card";
import Heading from "../../../../components/ui/Heading";
import { SkeletonCard, SkeletonH1 } from "../../../../components/ui/Skeletons";
// Assets
import defaultImage from "../../../../assets/default_playlist.jpg";
// Styles
import { Grid } from "../../../Genre/Genre.styles";
// Types
import { RelatedArtists as RelatedArtistsType } from "../../../../types/artist";

function RelatedArtists() {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR<RelatedArtistsType>(
    id && { urls: base_api_url + getRelatedArtists(id) }
  );

  return (
    <>
      {!isLoading ? (
        <>
          {data && !error && (
            <>
              <Heading>Similar artists</Heading>
              <Grid>
                {data.artists.map((item) => (
                  <Card
                    key={item.id}
                    image={
                      item.images.length > 0 ? item.images[0].url : defaultImage
                    }
                    title={item.name}
                    link={`/artist/${item.id}`}
                  />
                ))}
              </Grid>
            </>
          )}
        </>
      ) : (
        <>
          <SkeletonH1 />
          <Grid>
            {new Array(12).fill("").map((t) => (
              <SkeletonCard />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default RelatedArtists;
